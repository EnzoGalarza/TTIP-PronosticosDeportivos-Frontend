import "../../styles/Matches.css"

function Team({name, crest}){
    
        return(
            <div data-testid="team" className="team"> 
                <img src={crest} className="teamCrest" alt={name} />
                <div className="teamName">{name}</div>
            </div> 
        )
    
}

export default Team;