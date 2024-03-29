import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useToasts } from "react-toast-notifications";
import EditModal from '../../../common/modals/EditModal'
import DeleteModal from '../../../common/modals/DeleteModal'
import whatsapp from '../../../../assets/pics/guests/whatsapp.svg'
import telephone from '../../../../assets/pics/guests/call.svg'
import save1 from '../../../../assets/pics/guests/save.svg'
import pencil from '../../../../assets/pics/guests/pencil.svg'
const Tr = (props) => {
    // const uuid = require('uuid');
    const { addToast } = useToasts();
    const [part1, setPart1] = useState(props.part1)
    const [part2, setPart2] = useState('https://the-wedding-1.web.app/')
    const [part3, setPart3] = useState('noy-yarden/')
    // const [part1, setPart1] = useState('')
    // const [part3, setPart3] = useState('')
    const [flag, setFlag] = useState(false)
    const [temp, setTemp] = useState()
    const { error } = useSelector(state => state.guestReducer);
    useEffect(() => {
        if (error) {
            addToast(error, { appearance: "error", autoDismiss: true });
        }
    }, [error]);

    let seat = ''
    if (props.data.accept > 0 && props.data.table === null) {
        seat = "seat"
    }
    return (
        <tr key={props.index}>
            <td style={{ width: "5%" }}>{props.index}</td>
            <td className={props.back} onClick={() => setFlag(!flag)} style={{ cursor: "pointer" }}>{props.data.name}</td>
            <td>
                <a href={'https://api.whatsapp.com/send?phone=972' + props.data.phone + '&text=' + part1 + part2 + part3 + props.data._id}><img alt="whatsapp" width="20" src={whatsapp} /></a>
            </td>
            <td><a href={"tel:" + props.data.phone}><img alt="telephone" width="20" src={telephone} /></a></td>
            <td>{props.data.phone}</td>
            <td style={{ width: "3%" }}>{props.data.sum}</td>
            <td>{props.data.closeness}</td>
            <td className={props.back} style={{ width: "3%" }}>{props.data.accept}</td>
            <td className={seat} style={{ width: "8%" }}>
                {flag ? <div>
                    <input placeholder={props.data.table} style={{ width: "50%", textAlign: "center", marginLeft: "5%" }}
                        onChange={(e) => setTemp(e.target.value)} />
                    <img alt="save" style={{ cursor: "pointer" }} src={save1} width="20" onClick={() => props.save(props.data._id, parseInt(temp))} />
                </div> : props.data.table}</td>
            <td>{props.data.arrived}</td>
            <td>{props.data.gift}</td>
            <td>{props.data.notes}</td>
            <td style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <EditModal data={props.data} gG={props.gG} act={"edit"} button={<img alt="edit" src={pencil} width="22" style={{ cursor: "pointer" }} />} />
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     <DeleteModal del={props.del} id={props.data._id} />
            </td>
        </tr>
    );
}

export default Tr;