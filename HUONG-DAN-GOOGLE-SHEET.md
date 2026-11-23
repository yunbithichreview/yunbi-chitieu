# Kết nối Sổ Chi Tiêu với Google Sheet

Làm 1 lần trên **máy tính**, khoảng 5 phút. Xong rồi app trên điện thoại sẽ tự sao lưu lên Sheet mỗi khi có mạng.

## Bước 1. Để Sheet ở chế độ riêng tư

1. Mở Google Sheet của bạn.
2. Bấm nút **Chia sẻ** (góc trên bên phải).
3. Ở mục **Quyền truy cập chung**, đổi "Bất kỳ ai có đường liên kết" thành **Bị hạn chế** → **Xong**.

> App vẫn ghi vào Sheet được, vì đoạn mã chạy dưới tài khoản Google của chính bạn.

## Bước 2. Dán đoạn mã vào Sheet

1. Trong Sheet, bấm menu **Tiện ích mở rộng → Apps Script**. Một tab mới mở ra.
2. Xóa hết chữ có sẵn trong khung soạn thảo (`function myFunction() {...}`).
3. Mở file **`google-sheet/Code.gs`** (trong thư mục app), copy **toàn bộ** rồi dán vào.
4. Bấm biểu tượng **💾 Lưu** (hoặc Ctrl + S).

## Bước 3. Triển khai thành ứng dụng web

1. Bấm nút xanh **Triển khai** (góc trên bên phải) → **Tùy chọn triển khai mới**.
2. Bấm biểu tượng **⚙️ bánh răng** cạnh "Chọn loại" → chọn **Ứng dụng web**.
3. Điền như sau:
   - **Thực thi với tư cách:** Tôi
   - **Người có quyền truy cập:** Bất kỳ ai
4. Bấm **Triển khai**.
5. Google hỏi cấp quyền → **Cấp quyền truy cập** → chọn tài khoản của bạn.
   - Nếu hiện "Google chưa xác minh ứng dụng này": bấm **Nâng cao** → **Truy cập … (không an toàn)** → **Cho phép**.
     (Đây là đoạn mã của chính bạn nên an toàn. Google chỉ cảnh báo vì nó chưa được đăng ký công khai.)
6. Copy **URL ứng dụng web**. Link có dạng `https://script.google.com/macros/s/AKfy.../exec`.

> "Bất kỳ ai" chỉ có nghĩa là app trên điện thoại gọi được vào link này. Ai không có **mã bí mật** của bạn thì không đọc được và không ghi được gì.

## Bước 4. Dán link vào app

1. Trên điện thoại, mở app → **Cài đặt → ☁️ Google Sheet**.
2. Dán link vào ô **Link Apps Script** → bấm **🔗 Kết nối**.
3. Thấy dòng "✓ Đã đồng bộ lúc…" là xong. Mở Sheet sẽ thấy 2 tab mới: **Giao dịch** và **Tổng kết tháng**.

**Quan trọng:** chép **link** và **mã bí mật** (hiện ngay dưới ô link) vào Zalo "Cloud của tôi". Khi đổi điện thoại bạn sẽ cần cả hai.

## Khi đổi điện thoại

1. Cài app trên máy mới.
2. Vào **Cài đặt → ☁️ Google Sheet** → dán **link** và **mã bí mật** cũ.
3. Bấm **⬇️ Lấy dữ liệu từ Sheet**.

## Lưu ý

- **App là bản chính.** Đừng sửa số liệu trực tiếp trong Sheet, lần đồng bộ sau sẽ ghi đè lên. Muốn sửa thì sửa trong app.
- Bạn có thể thêm tab riêng trong Sheet để làm biểu đồ hay tính toán. App chỉ ghi vào 2 tab **Giao dịch** và **Tổng kết tháng**, cùng một tab ẩn `_du_lieu_app` dùng để khôi phục (đừng xóa tab ẩn này).
- Không có mạng thì app vẫn ghi bình thường. Có mạng lại, app tự gửi bù.
- Khi app có ít dữ liệu hơn hẳn so với Sheet (ví dụ máy mới), app sẽ **dừng lại hỏi bạn** chứ không tự ghi đè.
- **Quên mã bí mật:** trong Apps Script, chọn hàm `datLaiMaBiMat` ở thanh trên → bấm **▶ Chạy**. Sau đó nhập mã mới bất kỳ (ít nhất 8 ký tự) trong app rồi bấm Đồng bộ.
- **Sửa file Code.gs sau này:** dán mã mới vào → Lưu → **Triển khai → Quản lý các lần triển khai** → ✏️ → Phiên bản: **Phiên bản mới** → Triển khai. Link vẫn giữ nguyên.
