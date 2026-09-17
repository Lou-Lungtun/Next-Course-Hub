import Link from "next/link";
import type { Course } from "../../types/course";

type CourseCardProps = {
  course: Course;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function CourseCard({
  course,
  isFavorite,
  onToggleFavorite,
  onEdit,
  onDelete,
}: CourseCardProps) {
  return (
    <article className="courseCard">
      <p className="courseCode">{course.code}</p>
      <h2>
        <Link className="courseTitleLink" href={`/courses/${course.id}`}>
          {course.name}
        </Link>
      </h2>
      <p>{course.credit} หน่วยกิต</p>
      <p>ผู้สอน: {course.instructor}</p>

      <p className={course.isOpen ? "statusOpen" : "statusClosed"}>
        {course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}
      </p>

      <div className="courseCardActions">
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
            {isFavorite ? "บันทึกแล้ว" : "รายการโปรด"}
          </span>
        </button>

        <button className="courseEditButton" type="button" onClick={() => onEdit(course.id)}>
          แก้ไข
        </button>
        <button className="courseDeleteButton" type="button" onClick={() => onDelete(course.id)}>
          ลบ
        </button>
      </div>
    </article>
  );
}
