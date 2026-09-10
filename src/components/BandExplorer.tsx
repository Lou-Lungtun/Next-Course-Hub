"use client";
// บอก Next.js ว่าไฟล์นี้ทำงานฝั่งผู้ใช้ เพราะมี State และการกดปุ่ม
// useState ใช้เก็บข้อมูลที่เปลี่ยนได้บนหน้าเว็บ
// ChangeEvent ใช้กำหนด Type ของ event ที่เกิดจากการพิมพ์ใน input เพื่อให้ TypeScript ตรวจสอบโค้ดได้ถูกต้อง
import { useState, type ChangeEvent } from "react";
// นำ Type Band มาใช้ตรวจโครงสร้างข้อมูลวงดนตรี
import type { Band } from "@/types/band";
// นำ Component การ์ดมาใช้แสดงวงดนตรีแต่ละวง
import BandCard from "@/components/BandCard";

// กำหนดว่า BandExplorer ต้องรับ Array วงดนตรีจาก BandsPage
type BandExplorerProps = {
  // bands ต้องเป็น Array ที่มีข้อมูลตรงตาม Type Band
  bands: Band[];
};

// รับ bands ที่ BandsPage ส่งมา แล้วนำมาค้นหาและสร้างการ์ด
export default function BandExplorer({ bands }: BandExplorerProps) {
  // State เก็บข้อความที่ผู้ใช้พิมพ์ในช่องค้นหา
  const [keyword, setKeyword] = useState("");

  // State เก็บ id ของวงที่กำลังติดตาม
  const [followedIds, setFollowedIds] = useState<number[]>([]);

  // State เก็บจำนวน Like โดยใช้ id ของวงเป็น key
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});

  // ทำงานทุกครั้งที่ผู้ใช้พิมพ์ในช่องค้นหา
  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    // อ่านข้อความล่าสุดจาก input แล้วเก็บลง State keyword
    setKeyword(event.target.value);
  }

  // เพิ่ม id เมื่อติดตาม และนำ id ออกเมื่อเลิกติดตาม
  function handleToggleFollow(id: number) {
    // ใช้ค่าล่าสุดของ followedIds เพื่อคำนวณ Array ชุดใหม่
    setFollowedIds((prevIds) =>
      // ตรวจว่า id ของวงที่กดมีอยู่ในรายการติดตามแล้วหรือยัง
      prevIds.includes(id)
        // ถ้ามีอยู่แล้ว ให้กรอง id นั้นออกเพื่อเลิกติดตาม
        ? prevIds.filter((followedId) => followedId !== id)
        // ถ้ายังไม่มี ให้คัดลอก id เดิมและเพิ่ม id ใหม่ต่อท้าย
        : [...prevIds, id]
    );
  }

  // เพิ่มจำนวน Like ของวงที่กดขึ้นครั้งละ 1
  function handleLike(id: number) {
    // ใช้ยอด Like ล่าสุดเพื่อสร้าง Object ยอด Like ชุดใหม่
    setLikeCounts((prevCounts) => ({
      // คัดลอกยอดของทุกวงไว้ เพื่อไม่ให้ข้อมูลวงอื่นหาย
      ...prevCounts,
      // เลือกวงด้วย id ถ้ายังไม่เคยกดให้เริ่มจาก 0 แล้วบวก 1
      [id]: (prevCounts[id] ?? 0) + 1,
    }));
  }

  // ล้างช่องค้นหา การติดตาม และจำนวน Like กลับเป็นค่าเริ่มต้น
  function handleReset() {
    // ทำให้ช่องค้นหากลับเป็นข้อความว่าง
    setKeyword("");
    // ทำให้ไม่มี id ของวงใดอยู่ในรายการติดตาม
    setFollowedIds([]);
    // ทำให้ Object ยอด Like กลับเป็น Object ว่าง
    setLikeCounts({});
  }

  // ตัดช่องว่างหัวท้ายและแปลงคำค้นเป็นตัวเล็ก เพื่อค้นหาได้ง่ายขึ้น
  const searchText = keyword.trim().toLowerCase();

  // filter() สร้าง Array ใหม่ที่มีเฉพาะวงซึ่งตรงกับคำค้นหา
  const visibleBands = bands.filter((band) =>
    // เปลี่ยนชื่อวงเป็นตัวเล็ก แล้วตรวจว่ามี searchText อยู่หรือไม่
    band.name.toLowerCase().includes(searchText)
  );

  // ส่ง JSX ของเครื่องมือค้นหาและรายการวงกลับไปแสดงบนหน้าเว็บ
  return (
    // div ครอบส่วนค้นหาและผลลัพธ์ทั้งหมดของ Component
    <div className="bandExplorer">
      {/* section รวมช่องค้นหา ตัวเลขสรุป และปุ่มล้างข้อมูล */}
      <section className="bandToolbar" aria-label="เครื่องมือค้นหาวงดนตรี">
        {/* label เชื่อมข้อความกำกับเข้ากับช่องค้นหา */}
        <label className="bandSearch">
          {/* ข้อความบอกผู้ใช้ว่าช่องนี้ใช้ค้นหาอะไร */}
          <span>ค้นหาชื่อวงดนตรี</span>
          {/* Controlled Input เพราะ value และ onChange เชื่อมกับ State keyword */}
          <input
            // กำหนดให้ช่องนี้เป็นช่องค้นหา
            type="search"
            // แสดงค่าปัจจุบันที่เก็บอยู่ใน State keyword
            value={keyword}
            // เรียกฟังก์ชันทุกครั้งที่ข้อความในช่องเปลี่ยน
            onChange={handleKeywordChange}
            // แสดงข้อความตัวอย่างตอนที่ช่องค้นหายังว่าง
            placeholder="เช่น Dept หรือ Tilly Birds"
          />
        </label>

        {/* จำนวนวงที่ติดตามคำนวณจากจำนวน id ใน State */}
        {/* aria-live ช่วยให้โปรแกรมอ่านหน้าจอแจ้งเมื่อจำนวนเปลี่ยน */}
        <div className="bandSummary" aria-live="polite">
          {/* แสดงจำนวนผลการค้นหาเทียบกับจำนวนวงทั้งหมด */}
          <p>พบ {visibleBands.length} จาก {bands.length} วง</p>
          {/* แสดงจำนวน id ที่อยู่ใน Array followedIds */}
          <p>กำลังติดตาม {followedIds.length} วง</p>
        </div>

        {/* ปุ่มล้าง State ทั้งหมดกลับเป็นค่าเริ่มต้น */}
        <button className="bandResetButton" type="button" onClick={handleReset}>
          {/* ข้อความที่แสดงอยู่บนปุ่ม */}
          ล้างข้อมูลทั้งหมด
        </button>
      </section>

      {/* ตรวจว่าหลังกรองแล้วเหลือวงดนตรีหรือไม่ */}
      {visibleBands.length === 0 ? (
        // Empty State แสดงเมื่อไม่มีชื่อวงตรงกับคำค้นหา
        <section className="bandEmptyState">
          {/* หัวข้อแจ้งว่าไม่พบผลการค้นหา */}
          <h2>ไม่พบวงดนตรี</h2>
          {/* แนะนำให้ผู้ใช้ลองแก้คำค้นหา */}
          <p>ลองเปลี่ยนคำค้นหาแล้วค้นหาอีกครั้ง</p>
          {/* เมื่อกดปุ่มจะตั้ง keyword เป็นค่าว่าง เพื่อแสดงทุกวงอีกครั้ง */}
          <button type="button" onClick={() => setKeyword("")}>
            ล้างคำค้นหา
          </button>
        </section>
      ) : (
        // ถ้าพบข้อมูล ให้ map() สร้าง BandCard ตามจำนวนวงที่ค้นพบ
        <section className="bandGrid" aria-label="ผลการค้นหาวงดนตรี">
          {/* map() วน visibleBands ทีละวง และคืน BandCard หนึ่งใบ */}
          {visibleBands.map((band) => (
            <BandCard
              // key ช่วยให้ React แยกการ์ดแต่ละใบด้วย id ที่ไม่ซ้ำกัน
              key={band.id}
              // ส่ง Object ของวงปัจจุบันไปให้ BandCard
              band={band}
              // ส่ง true ถ้า id ของวงนี้อยู่ในรายการติดตาม
              isFollowing={followedIds.includes(band.id)}
              // ส่งยอด Like ของวงนี้ ถ้ายังไม่มีค่าให้ใช้ 0
              likeCount={likeCounts[band.id] ?? 0}
              // ส่งฟังก์ชันสลับการติดตามให้การ์ดเรียกใช้
              onToggleFollow={handleToggleFollow}
              // ส่งฟังก์ชันเพิ่ม Like ให้การ์ดเรียกใช้
              onLike={handleLike}
            />
          ))}
        </section>
      )}
    </div>
  );
}
