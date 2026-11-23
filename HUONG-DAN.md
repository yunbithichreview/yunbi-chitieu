# Sổ Chi Tiêu — Hướng dẫn

## 1. Đưa lên GitHub (làm 1 lần)

1. Đăng nhập https://github.com → bấm **New repository** (nút **+** góc trên phải).
2. Đặt tên, ví dụ `chi-tieu`, chọn **Public** → **Create repository**.
3. Bấm **uploading an existing file** → kéo thả **tất cả** file vào:
   `index.html`, `manifest.json`, `sw.js` và **cả thư mục `icons`** → **Commit changes**.
4. Vào **Settings** → **Pages** → mục *Branch* chọn `main` và `/ (root)` → **Save**.
5. Đợi 1–2 phút, link app sẽ là: `https://<tên-github-của-bạn>.github.io/chi-tieu/`

> Repo Public thì ai cũng xem được **code**, nhưng **dữ liệu chi tiêu không bao giờ lên GitHub** — nó chỉ nằm trong điện thoại của bạn.

## 2. Cài lên điện thoại

- **iPhone (Safari):** mở link → nút **Chia sẻ** → **Thêm vào MH chính**.
- **Android (Chrome):** mở link → menu **⋮** → **Thêm vào màn hình chính / Cài đặt ứng dụng**.

Mở app **1 lần khi có mạng**, sau đó dùng được cả khi không có mạng.

## 3. Lưu ý quan trọng về dữ liệu

- Dữ liệu lưu trong bộ nhớ của app trên điện thoại. Nếu xóa app / xóa dữ liệu trình duyệt thì **mất**.
- Mỗi tháng vào **Cài đặt → 📤 Sao lưu**. Điện thoại mở bảng Chia sẻ → chọn **Zalo → Cloud của tôi** (hoặc Google Drive / email). Quá 30 ngày chưa sao lưu, app sẽ nhắc ở tab Sổ ghi.
  - Nếu máy không mở bảng Chia sẻ, file được tải vào mục **Tải xuống** (Android: app *Files/Tệp*; iPhone: app *Tệp*). Hãy tự gửi file đó lên Zalo/Drive.
- Đổi điện thoại: cài app trên máy mới → tải file sao lưu từ Zalo/Drive về → **Cài đặt → Khôi phục** → chọn file.
- Thỉnh thoảng đếm tiền trong ví và bấm **Điều chỉnh** để số tiền mặt trong app khớp với thực tế.
- iPhone: luôn mở bằng icon ngoài màn hình chính (không mở trong Safari) để dữ liệu nằm cố định một chỗ.

## 4. Khi muốn sửa/cập nhật app

Upload lại file mới lên GitHub. Mỗi lần sửa, mở `sw.js` tăng số phiên bản ở dòng `const CACHE = 'so-chi-tieu-v5'` (v5 → v6 …).

## 5. Ảnh bìa

File `cover.png` (1280×640) là ảnh bìa của app. Muốn nó hiện khi gửi link GitHub cho người khác:
repo trên GitHub → **Settings** → mục **Social preview** → **Edit** → **Upload an image** → chọn `cover.png`.

## 6. Sao lưu tự động lên Google Sheet

Xem file **HUONG-DAN-GOOGLE-SHEET.md**.
Điện thoại sẽ nhận bản mới sau 1–2 lần mở app khi có mạng. Dữ liệu cũ vẫn giữ nguyên.
