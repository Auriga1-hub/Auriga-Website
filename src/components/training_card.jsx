function TrainingCard({ icon, title, description }) {

return (

<div className="miss-training-card">

<div className="miss-card-icon">{icon}</div>

<div className="miss-card-accent"></div>

<h3>{title}</h3>

<p>{description}</p>

</div>

);

}

export default TrainingCard;