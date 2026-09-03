// รับ BandCard ซึ่งเป็น Child Component สำหรับแสดงข้อมูลวงละหนึ่งใบ
import BandCard from "@/components/BandCard";
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

      {/* section รับการจัดวางแบบ Grid และรวม BandCard ทุกใบไว้ด้วยกัน */}
      {/* aria-label ส่งคำอธิบายของ section ให้โปรแกรมอ่านหน้าจอ */}
      <section className="bandGrid" aria-label="รายการวงดนตรี">
        {/* bands.map() รับ Array จาก data แล้ววน Object ทีละวง */}
        {/* แต่ละรอบสร้าง BandCard 1 ใบ, key แยกรายการ และ band ส่ง Object ผ่าน Props */}
        {bands.map((band) => (
          <BandCard key={band.id} band={band} />
        ))}
        {/* เมื่อ map() ทำงานครบ จะได้ BandCard ตามจำนวน Object ใน bands */}
      </section>
    </main>
  );
}
