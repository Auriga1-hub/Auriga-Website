import { Link } from "react-router-dom";
import "../css/program_cards.css";

function ProgramCard({ title, age, date, path }) {

return (

<div className="program-card">

<div className="program-card-top">

<span className="program-badge">
{age}
</span>

<h3>
{title}
</h3>

<div className="program-date">
<span>🗓</span> {date}
</div>

</div>

<Link to={path} className="program-btn">
Learn More →
</Link>

</div>

);

}

export default ProgramCard;