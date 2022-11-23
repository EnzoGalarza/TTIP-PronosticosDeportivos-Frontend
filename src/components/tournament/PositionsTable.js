import '../../styles/index.css'
import "../../styles/PositionsTable.css"
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

function PositionsTable({userScores}){

var position = 0

const getPositionColor = (position) => {
    switch (position){
        case 1:
            return "success"
        case 2:
            return "warning"
        case 3:
            return "danger"
        default:
            return "secondary"
    }
}

return(
    <MDBTable align='middle'>
        <MDBTableHead>
            <tr className='tableHead'>
                <td align ='middle'>#</td>
                <td>Nombre</td>
                <td align ='middle'>Puntos</td>
                <td align ='middle'>Aciertos</td>
                <td align ='middle'>Pronosticos totales</td>
                <td align ='middle'>Porcentaje de aciertos</td>
            </tr>
        </MDBTableHead>
        <MDBTableBody>
            {userScores.map(userScore =>{ 
            position = position + 1 
            return(
                <tr>
                    <td align ='middle'>
                        <MDBBadge color= {getPositionColor(position)} pill>
                            {position}
                        </MDBBadge>
                    </td>
                    <td>
                        <div className='d-flex align-items-center'>
                            <img
                            src={userScore.user.profileImage}
                            alt=''
                            style={{ width: '45px', height: '45px' }}
                            className='rounded-circle'
                            />
                            <div className='ms-3'>
                                <p className='fw-bold mb-1'>{userScore.user.name}</p>
                                <p className='text-muted mb-0'>{userScore.user.username}</p>
                            </div>
                        </div>
                    </td>
                    <td align='middle'>
                        {userScore.score}
                    </td>
                    <td align='middle'>
                        {userScore.hits}
                    </td>
                    <td align='middle'>
                        {userScore.totalPronostics}
                    </td>
                    <td align='middle'>
                        {userScore.percentage} %
                    </td>
                </tr>
            )})}
        </MDBTableBody>
    </MDBTable>
)

}

export default PositionsTable