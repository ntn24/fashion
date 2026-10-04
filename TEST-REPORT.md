# Kiểm tra bản đóng gói

Ngày: 04/10/2026.

## Đã chạy, đạt

- `node --check app.js` và `node --check sw.js`: cú pháp JavaScript.
- `node test.cjs`: vị trí mặc định theo loại trang phục; chọn lớp theo vùng hình đã xoay; xóa nền trắng nối viền và giữ vùng trắng bên trong kín; ID giao diện không trùng và có đủ cho các tham chiếu JS; assets tồn tại; đường dẫn manifest tương đối để host ở thư mục repository.

## Chưa xác nhận

Không thực hiện được kiểm thử trình duyệt do môi trường thiếu Chromium và tải trình duyệt không thành công. Chưa kiểm tra hình thức bằng screenshot và chưa thử camera/đa chạm/chia sẻ trên iPhone, Android thật. Không coi kiểm tra cú pháp/unit là kiểm chứng camera hoạt động.

Trước khi dùng rộng: triển khai GitHub Pages, mở bằng Safari/Chrome và thử cấp/từ chối camera, trước/sau, đóng băng, hai ngón, tải ảnh người + trang phục, nhiều lớp, chụp/tải/chia sẻ PNG, tải lại tủ đồ, offline và chuyển app nền. Kết quả camera khác nhau tùy thiết bị.
