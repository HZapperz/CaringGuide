import React from 'react';
import { useRouter } from "next/router";
import { useApp } from "@/context/app";
import { useEffect, useState } from "react";

const TermsOfUse = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Terms of Use</h1>
            <p>
                This is a mock version of the Terms of Use. The actual content is pending and will be updated once it is provided by the client.
            </p>
            <ul>
                <li>Term 1: [Description]</li>
                <li>Term 2: [Description]</li>
                <li>Term 3: [Description]</li>
                {/* Add more terms as needed */}
            </ul>
        </div>
    );
};

export default TermsOfUse;
