import '../../styles/index.css'
import "../../styles/PositionsTable.css"
import React, { useState, useEffect } from "react";
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {getCriterias} from "../../api/Requests";
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const PositionsTable = ({userScores, tournamentName, tournamentId}) => {

const [criteriasModalState, setCriteriasModalState] = useState(false)

const [criteriasData, setCriteriasData] = useState({
    criterias : []
})

const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Body>
    </Popover>
  );

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

        <Modal id="CriteriasModal" data-refresh = "false" isOpen={criteriasModalState} toggle={() => showCriterias([])}>
            <ModalHeader className="modal-header">
                    <span className='tournamentCriteriasTitle'>
                        Criterios
                    </span>
            </ModalHeader>
            <ModalBody className="modal-body">
                {criteriasData.criterias.map(criteria => {
                    return(
                        <div className='tournamentCriteria'>
                            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                                <Button variant="success">Click me to see</Button>
                            </OverlayTrigger>
                            {criteria.name}
                            {criteria.score}
                        </div>
                    )    
                })}
            </ModalBody>
            <ModalFooter className="modal-footer">

            </ModalFooter>
        </Modal>
    </>
)

}

export default PositionsTable