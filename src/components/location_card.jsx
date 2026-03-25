function LocationCard({ city, description, onClick }) {

return (

<button
className="location-select-card"
onClick={onClick}
>

<div className="location-select-card-inner">

<div className="location-select-icon">📍</div>

<h3>{city}</h3>

<p>{description}</p>

<span className="location-select-btn">
Book a tryout →
</span>

</div>

</button>

);

}

export default LocationCard;