/**
 * SkillsGap — Displays present skills, missing skills, strengths, and weaknesses.
 */
export default function SkillsGap({ presentSkills = [], missingSkills = [], strengths = [], weaknesses = [] }) {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Present Skills */}
      <Section
        title="Skills You Have"
        icon="✅"
        items={presentSkills}
        tagClass="skill-tag skill-tag-present"
        emptyMsg="No matching skills detected."
      />

      {/* Missing Skills */}
      <Section
        title="Skills to Develop"
        icon="🎯"
        items={missingSkills}
        tagClass="skill-tag skill-tag-missing"
        emptyMsg="No skill gaps detected — great match!"
      />

      {/* Strengths */}
      <Section
        title="Key Strengths"
        icon="💪"
        items={strengths}
        tagClass="skill-tag skill-tag-strength"
        isList
        emptyMsg="No specific strengths identified."
      />

      {/* Weaknesses */}
      <Section
        title="Areas of Improvement"
        icon="⚠️"
        items={weaknesses}
        tagClass="skill-tag skill-tag-missing"
        isList
        emptyMsg="No weaknesses identified."
      />
    </div>
  );
}

/**
 * Reusable section for listing items as tags or bullets.
 */
function Section({ title, icon, items, tagClass, isList = false, emptyMsg }) {
  return (
    <div className="glass-card p-5">
      <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
        <span>{icon}</span> {title}
        <span className="ml-auto text-xs font-normal text-text-muted">{items.length} items</span>
      </h4>

      {items.length === 0 ? (
        <p className="text-sm text-text-muted italic">{emptyMsg}</p>
      ) : isList ? (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-primary flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <span key={i} className={tagClass}>{item}</span>
          ))}
        </div>
      )}
    </div>
  );
}
