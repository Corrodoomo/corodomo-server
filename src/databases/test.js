const fs = require('fs');
const path = require('path');

// Đường dẫn đến thư mục chứa các entity
const dir = './entities';

// Đọc tất cả các file trong thư mục
fs.readdirSync(dir).forEach(file => {
  // Kiểm tra nếu file có đuôi .ts
  if (file.endsWith('.ts')) {
    // Đổi tên từ camelCase hoặc PascalCase thành kebab-case
    const newFileName = file
      .replace(/([a-z])([A-Z])/g, '$1-$2')  // Thêm dấu gạch nối giữa chữ thường và chữ hoa
      .replace('.ts', '.entity.ts')
      .toLowerCase();  // Chuyển tất cả thành chữ thường

    // Đổi tên file
    fs.renameSync(path.join(dir, file), path.join(dir, newFileName));

    console.log(`Renamed: ${file} -> ${newFileName}`);
  }
});
