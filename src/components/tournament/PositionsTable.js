import '../../styles/index.css'
import "../../styles/PositionsTable.css"
import React, { useState, useEffect } from "react";
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {getCriterias} from "../../api/Requests";
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const PositionsTable = ({userScores, tournamentName, tournamentId}) => {

const [criteriasModalState, setCriteriasModalState] = useState(false)

const [criteriasData, setCriteriasData] = useState({
    criterias : []
})

const getCriteriaName = (criteriaName) =>{

    switch (criteriaName){

        case "Complete":
            return "Resultado completo"
        case "Partial":
            return "Resultado parcial"
        case "Approach":
            return "Acercamiento"
        case "WinnerOrTie":
            return "Ganador"
        default:
            return ""

    }

}

const getCriteriaText = (criteriaName) =>{

    switch (criteriaName){

        case "Complete":
            return "Se debe acertar el resultado exacto del partido."
        case "Partial":
            return "Se deben acertar los goles de al menos uno de los equipos."
        case "Approach":
            return "Ambos resultados pronosticados deben tener una diferencia menor o igual a 2 " +
                   "del resultado final del partido."
        case "WinnerOrTie":
            return "Se debe acertar al ganador, o el empate en caso de producirse."
        default:
            return ""

    }

}

const popover = (criteriaName) =>{
    return(
        <Popover id="popover-basic">
            <Popover.Header as="h3">{getCriteriaName(criteriaName)}</Popover.Header>
            <Popover.Body>
                {getCriteriaText(criteriaName)}
            </Popover.Body>
        </Popover>
    )
}

var position = 0

const getPositionColor = (position) => {
    switch (position){
        case 1:
            return "warning"
        case 2:
            return "secondary"
        case 3:
            return "danger"
        default:
            return "primary"
    }
}

const getPositionNumber = (position) => {

    switch (position){
        case 1: case 2: case 3:
            return( <MDBBadge color= {getPositionColor(position)} pill>
                        {position}
                    </MDBBadge>)
        default:
            return (<div className='position'>
                        {position}
                    </div>)
    }

}

const getCriteriasData = () => {
    getCriterias(tournamentId)
        .then((response) =>{
            setCriteriasData({
                criterias: response.data
            })
        }).catch((error) => {console.log(error)})
}

const showCriterias = () =>{
    setCriteriasModalState(!criteriasModalState)
}

useEffect(() => {
    getCriteriasData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[]);

return(
    <>
        <div className='positionsTitle'>
            {tournamentName}
            <button className="btn btn-primary criteria" onClick={() => showCriterias()}><FontAwesomeIcon icon={faEye} /> Criterios de puntuación</button>
        </div>
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
                            {getPositionNumber(position)}
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

        <Modal id="CriteriasModal" data-refresh = "false" isOpen={criteriasModalState} toggle={() => showCriterias()}>
            <ModalHeader className="modal-header">
                    <span className='tournamentCriteriasTitle'>
                        Criterios
                    </span>
            </ModalHeader>
            <ModalBody className="modal-body">
                {criteriasData.criterias.map(criteria => {
                    return(
                        <div className='tournamentCriteria'>
                            <td className='tournamentCriteriaName'>
                                {getCriteriaName(criteria.name)}
                            </td>
                            <td className='tournamentCriteriaScore'>
                                {criteria.score} pts
                            </td>
                            <OverlayTrigger trigger="click" placement="right" overlay={popover(criteria.name)}>
                                <div className='seeCriteriaDescription'>
                                    <button className='btn btn-success seeCriteriaDescription'><FontAwesomeIcon icon={faEye} /></button>
                                </div>
                            </OverlayTrigger>
                        </div>
                    )    
                })}
            </ModalBody>
            <ModalFooter className="modal-footer">
            <div className='closeCriteriasModal'>
                <button className="btn btn-secondary closeCriteriasModal" onClick={() => showCriterias()}>Cerrar</button>
            </div>
            </ModalFooter>
        </Modal>
    </>
)

}

export default PositionsTable