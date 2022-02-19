
function VillagerCard({name, picture, check, correct}) {
    return (
        <>
            <button onClick={() => {check(correct)}}>{name}</button>
            <img src={picture}/>
        </>
    );
}

export default VillagerCard;