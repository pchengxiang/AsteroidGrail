import React from 'react';

interface TeamPanelProps {
    team: {
        health: number;
        resources: {
            gemStone: number;
            crystal: number;
        };
        grail: number;
    };
    teamName: string;
}

const TeamPanel = ({ team, teamName }: TeamPanelProps) => {
    return (
        <div>
            <h2>{teamName}</h2>
            <ul>
                <li>血量：{team.health}</li>
                <li>寶石：{team.resources.gemStone}</li>
                <li>水晶：{team.resources.crystal}</li>
                <li>星杯：{team.grail}</li>
            </ul>
        </div>
    );
};

export default TeamPanel;
