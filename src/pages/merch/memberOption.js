import React, { useState, useEffect } from 'react';
import { member } from "../../memberAvenue";

function MemberOption({ setTotal }) {
    const initialSelectedMembers = {};
    Object.keys(member.dataMember).forEach(key => {
        initialSelectedMembers[key] = '';
    });
    const [selectedMembers, setSelectedMembers] = useState(initialSelectedMembers);

    // useEffect untuk menghitung total setiap kali selectedMembers berubah
    useEffect(() => {
        let sum = 0;
        Object.values(selectedMembers).forEach(val => {
            if (val !== '') {
                const quantity = parseInt(val.split('-')[1]); // Extract quantity from value
                sum += quantity;
            }
        });
        setTotal(sum); // Update total
    }, [selectedMembers]);

    const handleChange = (event, memberId) => {
        const { value } = event.target;
        setSelectedMembers(prevState => ({
            ...prevState,
            [memberId]: value,
        }));
    };

    return (
        <div style={{ marginBottom: 30 }}>


            {Object.keys(member.dataMember).map((key) => (
                <select
                    key={key}
                    className="form-control"
                    value={selectedMembers[key]}
                    onChange={(e) => handleChange(e, key)}
                    style={{ marginBottom: 20, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                >
                    <option value="">Cheki with {member.dataMember[key].callsign}</option>
                    {[...Array(10)].map((_, index) => (
                        <option key={index} value={`${member.dataMember[key].callsign} - ${index + 1}`}>
                            {index + 1}
                        </option>
                    ))}
                </select>
            ))}
        </div>
    );
}

export default MemberOption;
