type CourseCardProps = {
  code: string;
  title: string;
  credits: number;
  isOpen: boolean;
};

export default function CourseCard({
  code,
  title,
  credits,
  isOpen,
}: CourseCardProps) {
  return (
    <article className="courseCard">
      <p className="courseCode">{code}</p>
      <h2>{title}</h2>
      <p>{credits} หน่วยกิต</p>

      <p className={isOpen ? "statusOpen" : "statusClosed"}>
        {isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}
      </p>
    </article>
  );
}