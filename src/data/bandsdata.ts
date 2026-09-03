// รับ Type Band จากไฟล์ types เพื่อให้ TypeScript ตรวจข้อมูลด้านล่าง
import type { Band } from "@/types/band";

// สร้าง Array bands และกำหนดให้ Object ทุกตัวต้องตรงกับ Type Band
// export ส่ง Array นี้ออกไปให้ app/bands/page.tsx รับไปใช้งาน
export const bands: Band[] = [
  // Object ตัวที่ 1 จะถูกส่งไปสร้าง BandCard ใบแรก
  {
    // รหัสวง ใช้เป็น key เพื่อแยกการ์ดแต่ละใบ
    id: 1,
    // ชื่อวง ส่งไปแสดงในหัวข้อของการ์ด
    name: "Dept",
    // แนวเพลง ส่งไปแสดงเป็นป้ายด้านบนชื่อวง
    genre: "Synth-pop",
    // path รูปเริ่มจาก public และส่งให้ src ของ Next Image
    image: "/images/bands/Dept.jpg",
    // Array สมาชิกชุดนี้จะถูกวนใน BandCard ด้วย band.members.map()
    members: [
      // Object สมาชิกคนที่ 1
      {
        // id ใช้เป็น key ของรายการสมาชิก
        id: 1,
        // name ส่งไปแสดงใน <span>
        name: "เบนซ์ ภวัต โอภาสสิริโชติ",
        // role ส่งไปแสดงใน <small>
        role: "นักร้องนำ/กีตาร์",
        image: "/images/bands/dept-member01.jpg",
      },
      // Object สมาชิกคนที่ 2 ใช้โครงสร้างเดียวกัน
      {
        id: 2,
        name: "ลุค ทาวน์เซน",
        role: "คีย์บอร์ด",
        image: "/images/bands/dept-member02.jpg",
      },
    ],
  },
  // Object ตัวที่ 2 จะถูกส่งไปสร้าง BandCard ใบที่สอง
  {
    // ข้อมูลแต่ละ property ถูกส่งไปใช้แบบเดียวกับวงแรก
    id: 2,
    name: "SERIOUS BACON",
    genre: "Pop",
    image: "/images/bands/serious bacon.jpg",
    // เก็บสมาชิกทั้งหมดของวง SERIOUS BACON
    members: [
      {
        id: 1,
        name: "เค้ก เปมิกา จิระนารักษ์",
        role: "นักร้องนำ",
        image: "/images/bands/bacon-member01.jpg",
      },
      {
        id: 2,
        name: "เมือง สองเมือง ไชยฤทธิ์",
        role: "นักร้อง มือกีตาร์ เบส กลอง และเปียโน",
        image: "/images/bands/bacon-member02.jpg",
      },
    ],
  },
  // Object ตัวที่ 3 จะถูกส่งไปสร้าง BandCard ใบที่สาม
  {
    // ข้อมูลแต่ละ property ถูกส่งไปใช้แบบเดียวกับสองวงก่อนหน้า
    id: 3,
    name: "Tilly Birds",
    genre: "Alternative Rock",
    image: "/images/bands/tilly birds.jpg",
    // เก็บสมาชิกทั้งหมดของวง Tilly Birds
    members: [
      {
        id: 1,
        name: "เติร์ด อนุโรจน์ เกตุเลขา",
        role: "นักร้องนำ",
        image: "/images/bands/tilly-member01.jpg",
      },
      {
        id: 2,
        name: "บิลลี่ ณัฐดนัย ชูชาติ",
        role: "กีตาร์และคีย์บอร์ด",
        image: "/images/bands/tilly-member02.jpg",
      },
      {
        id: 3,
        name: "ไมโล ธุวานนท์ ตันติวัฒนวรกุล",
        role: "กลอง",
        image: "/images/bands/tilly-member03.jpg",
      },
    ],
  },
  // ปิด Object วงสุดท้าย
];
// ปิด Array bands และส่งออกให้ page.tsx ผ่าน export
