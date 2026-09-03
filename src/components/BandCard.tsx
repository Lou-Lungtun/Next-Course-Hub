// รับ Image Component จาก Next.js เพื่อแสดงและปรับขนาดรูปอย่างเหมาะสม
import Image from "next/image";
// รับ Type Band เพื่อใช้ตรวจ Object ที่ Parent ส่งเข้ามาทาง Props
import type { Band } from "@/types/band";

// กำหนดว่า Props ของ BandCard ต้องมี property ชื่อ band
type BandCardProps = {
  // ค่า band ที่รับมาต้องตรงกับโครงสร้าง Type Band
  band: Band;
};

// สร้าง Child Component สำหรับแสดงข้อมูลวงดนตรีหนึ่งวง
// BandsPage ส่ง band={band} เข้ามา และ { band } ดึงค่านั้นจาก Props
export default function BandCard({ band }: BandCardProps) {
  // return ส่ง JSX ของการ์ดหนึ่งใบกลับไปให้ BandsPage
  return (
    /* article ครอบข้อมูลของวงหนึ่งวงและเชื่อมกับ CSS class bandCard */
    <article className="bandCard">
      {/* อ่าน band.image ที่ Parent ส่งมา และ && จะแสดงรูปเฉพาะเมื่อมีค่า */}
      {band.image && (
        /* div ครอบรูปเพื่อควบคุมสัดส่วนและซ่อนส่วนที่เกินกรอบ */
        <div className="bandImageWrapper">
          {/* Image รับ path จาก band.image แล้วสร้างรูปของวงปัจจุบัน */}
          <Image
            /* ใช้ class bandImage ตกแต่งรูปด้วย CSS */
            className="bandImage"
            /* ส่ง path ของรูปปัจจุบันให้ src */
            src={band.image}
            /* สร้างคำอธิบายรูปโดยนำ band.name มาต่อกับข้อความ */
            alt={`รูปวง ${band.name}`}
            /* กำหนดขนาดพื้นฐานเพื่อรักษาสัดส่วนระหว่างโหลด */
            width={500}
            height={300}
            /* บอก Next.js ว่าควรใช้รูปขนาดใดในหน้าจอแต่ละแบบ */
            sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
          />
        </div>
      )}

      {/* div นี้รับข้อมูลข้อความของวงและจัดเรียงด้วย CSS */}
      <div className="bandContent">
        {/* อ่าน genre จาก Object ที่รับผ่าน Props แล้วแสดงเป็นป้าย */}
        <p className="bandGenre">{band.genre}</p>
        {/* อ่าน name จาก Object แล้วแสดงเป็นหัวข้อของการ์ด */}
        <h2>{band.name}</h2>

        {/* หัวข้อย่อยก่อนเริ่มรายการสมาชิก */}
        <h3 className="memberTitle">สมาชิก</h3>
        {/* ul ครอบรายการสมาชิกทุกคนที่ map() สร้าง */}
        <ul className="memberList">
          {/* รับ Array members ของวงปัจจุบัน แล้ววนสมาชิกทีละ Object */}
          {band.members.map((member) => (
            /* สร้าง li หนึ่งรายการต่อสมาชิก และส่ง id ให้ key */
            <li key={member.id}>
              {/* แสดงรูปสมาชิกเมื่อข้อมูลมี path ของรูป */}
              {member.image && (
                <Image
                  className="memberImage"
                  src={member.image}
                  alt={`รูป ${member.name}`}
                  width={56}
                  height={56}
                  sizes="56px"
                />
              )}
              {/* ครอบชื่อและหน้าที่ให้อยู่ด้านขวาของรูป */}
              <div className="memberInfo">
                {/* อ่านชื่อสมาชิกปัจจุบันมาแสดง */}
                <span>{member.name}</span>
                {/* อ่านหน้าที่สมาชิกปัจจุบันมาแสดงด้วยข้อความขนาดเล็ก */}
                <small>{member.role}</small>
              </div>
            </li>
          ))}
          {/* เมื่อ map() จบ จะได้ li ครบตามจำนวนสมาชิกของวงนั้น */}
        </ul>
      </div>
    </article>
  );
}
