import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import { useDispatch } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { Main,  Submit, HoldMain, Form } from '../../LogAndReg/style'
import { ToastMsg, Title} from '../../common/Style'
import { editGuestById } from '../../../store/actions/guests/guest-actions'
// import { useForm } from 'react-hook-form'

let rules = {
    name: (/^[ -"A-Zא-תa-z1-9]{2,20}$/),
    phone: (/^[0]{0,1}[5]{1}[0-9]{8}$/),
    sum: (/^[0-9]{0,1}$/),
    closeness: (/^[ -A-Zא-תa-z1-9]{2,20}$/),
    accept: (/^[0-9]{0,1}$/),
    table: (/^[0-9]{0,2}$/),
    arrived: (/^[0-9]{0,1}$/),
    gift: (/^[0-9]{0,6}$/),
    notes: (/^[ -,A-Zא-תa-z1-9]{2,20}$/)
};
const EditGuest = (props) => {
    const dispatch = useDispatch();
    const { addToast } = useToasts();
    const [vname, setVname] = useState(props.data.name === undefined ? null : props.data.name)
    const [ename, setEname] = useState(true)
    const [hname, setHname] = useState(null)

    const [vphone, setVphone] = useState(props.data.phone === undefined ? null : props.data.phone)
    const [ephone, setEphone] = useState(true)
    const [hphone, setHphone] = useState(null)

    const [vsum, setVsum] = useState(props.data.sum === undefined ? null : props.data.sum)
    const [esum, setEsum] = useState(true)
    const [hsum, setHsum] = useState(null)

    const [vcloseness, setVcloseness] = useState(props.data.closeness === undefined ? null : props.data.closeness)
    const [ecloseness, setEcloseness] = useState(true)
    const [hcloseness, setHcloseness] = useState(null)

    const [vaccept, setVaccept] = useState(props.data.accept === undefined ? null : props.data.accept)
    const [eaccept, setEaccept] = useState(true)
    const [haccept, setHaccept] = useState(null)

    const [vtable, setVtable] = useState(props.data.table === undefined ? null : props.data.table)
    const [etable, setEtable] = useState(true)
    const [htable, setHtable] = useState(null)

    const [varrived, setVarrived] = useState(props.data.arrived === undefined ? null : props.data.arrived)
    const [earrived, setEarrived] = useState(true)
    const [harrived, setHarrived] = useState(null)

    const [vgift, setVgift] = useState(props.data.gift === undefined ? null : props.data.gift)
    const [egift, setEgift] = useState(true)
    const [hgift, setHgift] = useState(null)

    const [vnotes, setVnotes] = useState(props.data.notes === undefined ? null : props.data.notes)
    const [enotes, setEnotes] = useState(true)
    const [hnotes, setHnotes] = useState(null)

    const SubmitHandler = async e => {
        e.preventDefault()
        if ((rules.name).test(vname)) {
            setHname(null)
            setEname(false)
        }
        else {
            setHname('2-20 אותיות וספרות בלבד')
            setEname(true)
        }

        if ((rules.phone).test(vphone)) {
            setHphone(null)
            setEphone(false)
        }
        else {
            setHphone('מספר פלאפון לא חוקי')
            setEphone(true)
        }

        if ((rules.sum).test(vsum)) {
            setHsum(null)
            setEsum(false)
        }
        else {
            setHsum('ספרה בין 0-9')
            setEsum(true)
        }

        if ((rules.closeness).test(vcloseness)) {
            setHcloseness(null)
            setEcloseness(false)
        }
        else {
            setHcloseness('2-20 אותיות וספרות בלבד')
            setEcloseness(true)
        }

        if ((rules.accept).test(vaccept) || vaccept === null) {
            setHaccept(null)
            setEaccept(false)
        }
        else {
            setHaccept('ספרה בין 0-9')
            setEaccept(true)
        }

        if ((rules.table).test(vtable) || vtable === null) {
            setHtable(null)
            setEtable(false)
        }
        else {
            setHtable('ספרה או שתיים בין 0-99')
            setEtable(true)
        }

        if ((rules.arrived).test(varrived) || varrived === null) {
            setHarrived(null)
            setEarrived(false)
        }
        else {
            setHarrived('ספרה בין 0-9')
            setEarrived(true)
        }

        if ((rules.gift).test(vgift) || vgift === null) {
            setHgift(null)
            setEgift(false)
        }
        else {
            setHgift('0-6 ספרות בלבד')
            setEgift(true)
        }

        if ((rules.notes).test(vnotes) || vnotes === null) {
            setHnotes(null)
            setEnotes(false)
        }
        else {
            setHnotes("2-20 אותיות וספרות בלבד")
            setEnotes(true)
        }
        if (!enotes && !egift && !earrived && !etable && !eaccept && !ecloseness && !esum && !ephone && !ename) {
            let p = {
                name: vname,
                phone: vphone,
                sum: vsum,
                closeness: vcloseness,
                accept: vaccept,
                table: vtable,
                arrived: varrived,
                gift: vgift,
                notes: vnotes
            }
            dispatch(editGuestById(p, props.data._id)).then(res => {
                if (!res.error) {
                    props.gG()
                    props.handleClose()
                    addToast(<ToastMsg>הפעולה הצליחה</ToastMsg>, { appearance: "success", autoDismiss: true });
                }
                else {
                    addToast(<ToastMsg>{res.error}</ToastMsg>, { appearance: "error", autoDismiss: true });
                }
            })

        }
        // let data = {
        //     name: vname
        // }
        // let validation = new Validator(data, rules);
        // console.log(validation.passes('name'))
        // let p = {
        //     name: data.name, phone: data.phone, sum: data.sum, closeness: data.closeness,
        //     accept: data.accept, table: data.table, arrived: data.arrived, gift: data.gift, note: data.note
        // }


    }

    return (
        <HoldMain>
            <Main className="animated fadeIn">
                <Title style={{ fontSize: "1.8rem", margin: "20px auto" }}>עריכה</Title>
                <Form onSubmit={SubmitHandler} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                    <TextField
                        onChange={(e) => setVname(e.target.value)}
                        id="outlined-name"
                        label="שם מלא"
                        defaultValue={vname}
                        variant="outlined"
                        required
                        helperText={hname}
                        error={ename}
                        style={{ marginBottom: "15px", direction: "rtl" }}
                    />
                    <TextField
                        onChange={(e) => setVphone(e.target.value)}
                        id="outlined-phone"
                        label="מס' פלאפון"
                        defaultValue={vphone}
                        variant="outlined"
                        required
                        helperText={hphone}
                        error={ephone}
                        style={{ marginBottom: "15px" }}
                    />

                    <TextField
                        onChange={(e) => setVsum(e.target.value)}
                        id="outlined-sum"
                        label="הוזמנו"
                        defaultValue={vsum}
                        variant="outlined"
                        required
                        helperText={hsum}
                        error={esum}
                        style={{ marginBottom: "15px" }}
                    />

                    <TextField
                        onChange={(e) => setVcloseness(e.target.value)}
                        id="outlined-closeness"
                        label="קירבה"
                        defaultValue={vcloseness}
                        variant="outlined"
                        required
                        helperText={hcloseness}
                        error={ecloseness}
                        style={{ marginBottom: "15px", direction: "rtl" }}
                    />

                    <TextField
                        onChange={(e) => setVaccept(e.target.value)}
                        id="outlined-accept"
                        label="אישרו"
                        defaultValue={vaccept}
                        variant="outlined"
                        helperText={haccept}
                        error={eaccept}
                        style={{ marginBottom: "15px" }}
                    />

                    <TextField
                        onChange={(e) => setVtable(e.target.value)}
                        id="outlined-table"
                        label="שולחן"
                        defaultValue={vtable}
                        variant="outlined"
                        helperText={htable}
                        error={etable}
                        style={{ marginBottom: "15px" }}
                    />

                    <TextField
                        onChange={(e) => setVarrived(e.target.value)}
                        id="outlined-arrived"
                        label="הגיעו"
                        defaultValue={varrived}
                        variant="outlined"
                        helperText={harrived}
                        error={earrived}
                        style={{ marginBottom: "15px" }}
                    />

                    <TextField
                        onChange={(e) => setVgift(e.target.value)}
                        id="outlined-gift"
                        label="מתנה"
                        defaultValue={vgift}
                        variant="outlined"
                        helperText={hgift}
                        error={egift}
                        style={{ marginBottom: "15px", direction: "rtl" }}
                    />

                    <TextField
                        onChange={(e) => setVnotes(e.target.value)}
                        id="outlined-notes"
                        label="הערות"
                        defaultValue={vnotes}
                        variant="outlined"
                        helperText={hnotes}
                        error={enotes}
                        style={{ marginBottom: "15px", direction: "rtl" }}
                    />

                    <Submit type="submit">שמירה</Submit>
                </Form>
            </Main>
        </HoldMain>
    );



}

export default EditGuest;