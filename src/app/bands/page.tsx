// รับ Client Component ที่จัดการการค้นหา ติดตาม และ Like
import BandExplorer from "@/components/BandExplorer";
// รับ Array bands ที่ export มาจากไฟล์ data
import { bands } from "@/data/bandsdata";

// สร้าง Parent Component และ export default ให้ Next.js ใช้เป็นหน้า /bands
export default function BandsPage() {
  // return ส่ง JSX ทั้งหมดของหน้านี้กลับไปให้ Next.js แสดงผล
  return (
    /* main ครอบเนื้อหาหลักและรับรูปแบบจาก class page กับ bandsPage */
    <main className="page bandsPage">
      {/* header รวมข้อความแนะนำก่อนแสดงข้อมูลวงดนตรี */}
      <header className="bandsHeader">
        {/* แสดงข้อความหมวดหมู่ขนาดเล็ก */}
        <p className="eyebrow">FAVORITE BANDS</p>
        {/* แสดงหัวข้อหลักของหน้า */}
        <h1>วงดนตรีที่ชื่นชอบ</h1>
        {/* แสดงคำอธิบายว่าผู้ใช้จะพบข้อมูลอะไรในหน้านี้ */}
        <p className="pageDescription">
          รวมวงดนตรีที่ชื่นชอบ พร้อมแนวเพลงและรายชื่อสมาชิกของแต่ละวง
        </p>
      </header>

      {/* ส่ง Array bands ให้ BandExplorer ผ่าน Props */}
      <BandExplorer bands={bands} />
    </main>
  );
}
