import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "ao-thun-01",
    name: "Áo Thun Basic Cotton",
    price: 250000,
    description:
      "Áo thun basic chất liệu cotton 100%, thoáng mát, phù hợp mặc hàng ngày. Form regular fit thoải mái.",
    image: "",
    category: "Áo",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "ao-so-mi-02",
    name: "Áo Sơ Mi Linen Cao Cấp",
    price: 450000,
    description:
      "Áo sơ mi linen cao cấp, chất vải mềm mịn, thoáng khí tự nhiên. Thiết kế thanh lịch phù hợp đi làm và dạo phố.",
    image: "",
    category: "Áo",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "ao-khoac-03",
    name: "Áo Khoác Bomber Thời Trang",
    price: 680000,
    description:
      "Áo khoác bomber phong cách trẻ trung, chất liệu dù chống nước nhẹ. Lót bên trong mềm mại, giữ ấm tốt.",
    image: "",
    category: "Áo",
    sizes: ["M", "L", "XL", "XXL"],
  },
  {
    id: "quan-jean-04",
    name: "Quần Jean Slim Fit",
    price: 520000,
    description:
      "Quần jean slim fit co giãn tốt, tôn dáng. Chất liệu denim dày dặn, bền đẹp theo thời gian.",
    image: "",
    category: "Quần",
    sizes: ["28", "29", "30", "31", "32"],
  },
  {
    id: "quan-kaki-05",
    name: "Quần Kaki Chino Regular",
    price: 380000,
    description:
      "Quần kaki chino form regular, chất vải mềm mịn không nhăn. Phù hợp đi làm, đi chơi đều được.",
    image: "",
    category: "Quần",
    sizes: ["28", "29", "30", "31", "32"],
  },
  {
    id: "quan-short-06",
    name: "Quần Short Thể Thao",
    price: 220000,
    description:
      "Quần short thể thao thoáng mát, co giãn 4 chiều. Thiết kế năng động phù hợp tập gym và chạy bộ.",
    image: "",
    category: "Quần",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "giay-sneaker-07",
    name: "Giày Sneaker Classic",
    price: 750000,
    description:
      "Giày sneaker classic với đế cao su chống trượt, form giày thoải mái. Phối được nhiều phong cách khác nhau.",
    image: "",
    category: "Giày",
    sizes: ["39", "40", "41", "42", "43"],
  },
  {
    id: "giay-boot-08",
    name: "Giày Boot Da Cao Cổ",
    price: 980000,
    description:
      "Giày boot da thật cao cổ, thiết kế mạnh mẽ cá tính. Đế cao su chống mòn, phù hợp mùa đông.",
    image: "",
    category: "Giày",
    sizes: ["39", "40", "41", "42", "43"],
  },
  {
    id: "tui-xach-09",
    name: "Túi Tote Vải Canvas",
    price: 180000,
    description:
      "Túi tote vải canvas dày dặn, in họa tiết thời trang. Đựng được laptop 14 inch, tiện lợi đi học đi làm.",
    image: "",
    category: "Phụ kiện",
    sizes: ["Free Size"],
  },
  {
    id: "mu-luoi-trai-10",
    name: "Mũ Lưỡi Trai Thêu Logo",
    price: 150000,
    description:
      "Mũ lưỡi trai cotton thêu logo tinh tế, có khóa điều chỉnh phía sau. Chống nắng hiệu quả.",
    image: "",
    category: "Phụ kiện",
    sizes: ["Free Size"],
  },
];

export const categories = ["Tất cả", "Áo", "Quần", "Giày", "Phụ kiện"];
