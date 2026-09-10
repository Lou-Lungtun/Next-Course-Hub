import type { Course } from "@/types/course";

type CourseCardProps = {
  course: Course;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
};

export default function CourseCard({
  course,
  isFavorite,
  onToggleFavorite,
}: CourseCardProps) {
  return (
    <article className="courseCard">
      <p className="courseCode">{course.code}</p>
      <h2>{course.title}</h2>
      <p>{course.credits} หน่วยกิต</p>

      <p className={course.isOpen ? "statusOpen" : "statusClosed"}>
        {course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}
      </p>

      <button
        className="button favoriteButton"
        type="button"
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(course.id)}
      >
        <span className="favoriteIcon" aria-hidden="true">
          {isFavorite ? "★" : "☆"}
        </span>
        <span>
          {isFavorite ? "อยู่ในรายการโปรด" : "เพิ่มเป็นรายการโปรด"}
        </span>
      </button>
    </article>
  );
}
