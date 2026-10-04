# Miro — Gương thử đồ trên điện thoại

Ứng dụng web tiếng Việt, không cần build, không cần API key. Chạy trên GitHub Pages.

## Bản này làm được gì?

- Camera trước/sau, lật gương, đóng băng khung hình.
- Tải ảnh người thay camera; tải nhiều ảnh quần áo hoặc một ảnh combo.
- Tủ đồ lưu bằng IndexedDB trên thiết bị, phân loại áo/quần/cả bộ.
- Nhiều lớp trang phục; kéo, chụm 2 ngón để phóng/xoay, chỉnh chiều rộng/chiều dài/độ rõ/vị trí bằng thanh trượt.
- Xóa nền trắng nối với viền ảnh (đơn giản, có xem trước).
- Chụp kết quả PNG 900 × 1200, tải xuống hoặc chia sẻ nếu trình duyệt hỗ trợ.
- Giao diện điện thoại/máy tính, bộ đồ mẫu, lưu giao diện offline sau lần tải đầu thành công.

**Giới hạn quan trọng:** Đây là gương ghép ảnh 2D thủ công. Không phải AI thay đồ, không tự theo dõi cơ thể, không biến dạng vải, không che trang phục sau tay/tóc, không đánh giá size hay kết luận mặc đẹp. Khi người di chuyển phải căn lại đồ, hoặc dùng đóng băng/ảnh tĩnh. Không thể bảo đảm chạy trên mọi điện thoại. Camera trước/sau phụ thuộc thiết bị và trình duyệt; một số máy chỉ có một camera hoặc không đáp ứng yêu cầu camera sau.

## Đưa lên GitHub để dùng ngay

1. Giải nén file ZIP này trên máy tính.
2. Vào https://github.com/new tạo repository, ví dụ `miro-fitting-room` (Public nếu dùng Pages miễn phí).
3. Chọn **Add file → Upload files**, tải toàn bộ các file **bên trong thư mục mirror-fit** lên gốc repository. `index.html` phải ở gốc, không lồng thêm thư mục. Commit changes.
4. Mở **Settings → Pages → Build and deployment → Source → Deploy from a branch**.
5. Chọn branch `main`, thư mục `/ (root)`, bấm **Save**.
6. Đợi GitHub triển khai xong, mở `https://TEN-GITHUB.github.io/miro-fitting-room/` trên điện thoại.
7. Cho phép camera khi được hỏi. Không mở trực tiếp `index.html` bằng file:// để dùng camera.

Nguồn hướng dẫn Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
Camera cần HTTPS hoặc localhost: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia

## Dùng trên điện thoại

Ưu tiên Safari cập nhật trên iPhone hoặc Chrome cập nhật trên Android. Nếu link trong Facebook/Zalo không mở camera được, chọn mở bằng trình duyệt ngoài. iPhone: Chia sẻ → Thêm vào MH chính. Android: menu trình duyệt → Thêm vào màn hình chính (tùy phiên bản).

1. Đặt máy cố định đủ xa để thấy người, hoặc chọn ảnh toàn thân rõ nét.
2. Chọn dấu +, tải PNG trang phục nền trong suốt (ảnh chụp đồ trải phẳng, nhìn chính diện là tốt nhất).
3. Nếu ảnh có nền trắng, thử chức năng xóa nền trắng và xem trước. Đồ màu trắng chạm nền có thể bị xóa nhầm; tắt tùy chọn hoặc chuẩn bị PNG tách nền sẵn.
4. Chọn loại “Cả bộ / đầm” nếu tải một ảnh nguyên bộ. Hoặc thêm áo và quần riêng để căn từng phần.
5. Kéo, dùng hai ngón hoặc thanh trượt căn vào người. Chọn tên món trong Căn chỉnh để sửa lớp bị che.
6. Nút tròn giữa chụp khung gương (không có đường viền chỉnh sửa), không phải ảnh chụp toàn giao diện.
7. Chọn Tải ảnh hoặc Chia sẻ / Lưu ảnh. Nếu iPhone mở ảnh thay vì tải, nhấn giữ ảnh để lưu.

Ảnh dọc hiển thị theo khung 3:4 với crop ở giữa; hãy chừa khoảng trống trên/dưới khi chụp ảnh người. Ảnh nhập tối đa 25 MB, được giảm cạnh dài về 1600 px để tiết kiệm bộ nhớ. Định dạng HEIC tùy trình duyệt; chuyển sang JPG/PNG nếu không đọc được.

## Quyền riêng tư

Không backend, không analytics, không gửi ảnh/camera lên mạng. Tủ đồ chỉ lưu trong trình duyệt hiện tại, không đồng bộ các thiết bị. Ảnh người và ảnh chụp chỉ giữ trong phiên, trừ khi bạn tải/chia sẻ. Khi chuyển tab, camera được tắt; bấm Camera để mở lại. Xóa dữ liệu trang web sẽ mất tủ đồ. Chế độ riêng tư hoặc hết dung lượng có thể không lưu được; app sẽ báo và vẫn dùng tạm trong phiên. Nên giữ bản gốc ảnh quan trọng.

## Phát triển tại máy tính

```sh
cd mirror-fit
python3 -m http.server 8080
```

Mở http://localhost:8080. Để thử bằng điện thoại khác cần host HTTPS; HTTP qua địa chỉ LAN thường không được cấp camera. Không có dependencies runtime.

- `index.html`: giao diện.
- `style.css`: responsive, vùng thao tác cảm ứng.
- `app.js`: canvas, camera, ảnh, tủ đồ, cử chỉ và export.
- `sw.js`: cache offline. Khi cập nhật lớn, tăng tên cache và đóng/mở lại app.

## Nếu muốn AI mặc đồ chân thực

Cần xây thêm backend gọi API virtual try-on nhận ảnh người + ảnh trang phục, xử lý trạng thái chờ/lỗi/hạn mức và xin phép tải ảnh lên dịch vụ đó. Không đặt khóa API trong JavaScript public hoặc repository. GitHub Pages chỉ host frontend, không thể tự chạy mô hình AI. Bản này chưa có dịch vụ hoặc kết nối AI và không thu phí sử dụng API.

## Kiểm thử trước khi phát hành rộng

Mã nguồn đã có kiểm tra tự động cơ bản tại thời điểm đóng gói; xem `TEST-REPORT.md`. Cần kiểm thử trên iPhone và Android thật với camera thật: cấp/từ chối quyền, đổi camera, đưa app nền rồi mở lại, ảnh HEIC, chụm 2 ngón, tải/chia sẻ ảnh, offline và thiếu dung lượng. Chưa chứng nhận tương thích tất cả điện thoại.
