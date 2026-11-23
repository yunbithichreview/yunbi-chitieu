/**
 * Sổ Chi Tiêu – nhận dữ liệu từ app và ghi vào Google Sheet này.
 * Cách cài: xem file HUONG-DAN-GOOGLE-SHEET.md
 *
 * Bảo mật: lần đồng bộ đầu tiên, app gửi kèm "mã bí mật" và mã này được ghi nhớ.
 * Từ đó chỉ app có đúng mã mới ghi/đọc được. Quên mã: chạy hàm datLaiMaBiMat bên dưới.
 */
const TAB_TX = 'Giao dịch';
const TAB_SUM = 'Tổng kết tháng';
const TAB_DATA = '_du_lieu_app'; // bản đầy đủ để khôi phục về app (đang ẩn, đừng sửa)

function doGet() {
  return out_({ ok: true, message: 'Sổ Chi Tiêu: kết nối hoạt động ✓' });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const req = JSON.parse(e.postData.contents);
    const props = PropertiesService.getScriptProperties();

    if (!req.key || String(req.key).length < 8) return out_({ ok: false, error: 'Thiếu mã bí mật' });
    let key = props.getProperty('KEY');
    if (!key) { props.setProperty('KEY', String(req.key)); key = String(req.key); }
    if (String(req.key) !== key) return out_({ ok: false, error: 'Sai mã bí mật' });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const existing = Number(props.getProperty('COUNT') || 0);

    if (req.action === 'get') {
      return out_({ ok: true, data: readData_(ss) });
    }

    if (req.action === 'sync') {
      const n = req.data.tx.length;
      // Chặn ghi đè nhầm (VD: điện thoại mới chưa có dữ liệu)
      if (!req.force) {
        if (n === 0 && existing > 0) return out_({ ok: false, error: 'EMPTY', existing: existing });
        if (existing >= 20 && n < existing / 2) return out_({ ok: false, error: 'SHRINK', existing: existing });
      }
      writeData_(ss, req.data);
      writeTable_(ss, TAB_TX,
        ['Ngày', 'Loại', 'Nhóm', 'Chi tiết', 'Hình thức', 'Số tiền', 'Ghi chú'],
        req.rows, [6], true);
      writeTable_(ss, TAB_SUM,
        ['Tháng', 'Rút tiền', 'Chi tiền mặt', 'Chi thẻ', 'Tổng chi', 'Tiền vào', 'Còn lại', 'Tiền mặt trong ví cuối tháng'],
        req.summary, [2, 3, 4, 5, 6, 7, 8], false);
      props.setProperty('COUNT', String(n));
      return out_({ ok: true, count: n });
    }

    return out_({ ok: false, error: 'Lệnh không hợp lệ' });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function writeTable_(ss, name, header, rows, moneyCols, firstColIsDate) {
  const sh = ss.getSheetByName(name) || ss.insertSheet(name);
  sh.clearContents();
  const body = rows.map(function (r) {
    return r.map(function (v, i) {
      if (i === 0 && firstColIsDate && /^\d{4}-\d{2}-\d{2}$/.test(v)) {
        const p = v.split('-').map(Number);
        return new Date(p[0], p[1] - 1, p[2]);
      }
      return v;
    });
  });
  const data = [header].concat(body);
  sh.getRange(1, 1, data.length, header.length).setValues(data);
  sh.getRange(1, 1, 1, header.length).setFontWeight('bold').setBackground('#e2f5ee');
  sh.setFrozenRows(1);
  if (body.length) {
    moneyCols.forEach(function (c) { sh.getRange(2, c, body.length, 1).setNumberFormat('#,##0'); });
    if (firstColIsDate) sh.getRange(2, 1, body.length, 1).setNumberFormat('dd/mm/yyyy');
  }
  sh.autoResizeColumns(1, header.length);
}

// Lưu toàn bộ dữ liệu app dạng chữ, chia nhỏ vì mỗi ô chỉ chứa tối đa 50.000 ký tự.
// Mỗi phần thêm chữ "x" ở đầu để Sheet không hiểu nhầm thành công thức.
function writeData_(ss, data) {
  let sh = ss.getSheetByName(TAB_DATA);
  if (!sh) { sh = ss.insertSheet(TAB_DATA); sh.hideSheet(); }
  sh.clear();
  const s = JSON.stringify(data), size = 40000, chunks = [];
  for (let i = 0; i < s.length; i += size) chunks.push(['x' + s.slice(i, i + size)]);
  sh.getRange(1, 1, chunks.length, 1).setValues(chunks);
}

function readData_(ss) {
  const sh = ss.getSheetByName(TAB_DATA);
  if (!sh || sh.getLastRow() === 0) return null;
  const s = sh.getRange(1, 1, sh.getLastRow(), 1).getValues()
    .map(function (r) { return String(r[0]).slice(1); }).join('');
  return s ? JSON.parse(s) : null;
}

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

// Chạy hàm này (chọn tên hàm ở thanh trên rồi bấm ▶ Chạy) nếu quên mã bí mật.
// Lần đồng bộ tiếp theo từ app sẽ đặt mã mới.
function datLaiMaBiMat() {
  PropertiesService.getScriptProperties().deleteProperty('KEY');
}
