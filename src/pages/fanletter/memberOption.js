import React, { useState } from 'react';
import { member } from "../../memberAvenue";

function MemberOption({ handleChangeMember }) {
    const [selectedMember, setSelectedMember] = useState('');

    const handleChange = (event) => {
        setSelectedMember(event.target.value);
        handleChangeMember(event.target.value);
    };

    return (
        <div style={{ marginBottom: 30 }}>

            <select
                className="form-control"
                id="memberDropdown"
                value={selectedMember}
                onChange={handleChange}
            >
                <option value="">Select Member</option>
                {Object.keys(member.dataMember).map((key) => (
                    <option key={key} value={key}>
                        {member.dataMember[key].callsign}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default MemberOption;
