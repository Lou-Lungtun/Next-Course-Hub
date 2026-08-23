import Link from "next/link";

export default function HomePage() {
  const siteName = "Student Course Hub";
  const description = "เว็บไซต์รวบรวมข้อมูลรายวิชา เพื่อช่วยให้นักศึกษาค้นหาและตรวจสอบสถานะการลงทะเบียนได้สะดวก";
  return (
    <main className="page homePage">
      <section className="hero card">
        <p className="eyebrow">WEB TECHNOLOGY · COURSE DIRECTORY</p>
        <h1>{siteName}</h1>
        <p className="heroDescription">{description}</p>
        <Link className="button" href="/courses">ดูรายวิชาทั้งหมด</Link>
      </section>
      <section className="infoCard">
        <h2>เว็บไซต์นี้เหมาะกับใคร</h2>
        <p>เหมาะสำหรับนักศึกษาที่ต้องการดูข้อมูลรายวิชา จำนวนหน่วยกิต และสถานะการเปิดลงทะเบียนในแต่ละวิชา</p>
      </section>
    </main>
  );
}
