// Permet de rendre les statistiques du PJ/PNJ selectioner .
// les stats sont:
// taille : de 1 a 3 (petit , normal, grand)
// Phisique : de 1 a 3  (shetfie , normale , puissant)
// beauté : de 1 a 3 (moche, banale , beau)
// inteligence : de 1 a 3  (idiot du village, normal , génie)
// Le MJ peut modifier les valeurs. 
// et les changements temporaires apportés s'afficheront sur l'interface joueur (vert si positife , rouge si negatife ).
import React, { useState } from 'react';
import './Statistical.css'; // Assurez-vous de créer un fichier CSS pour les styles

const Statistical = () => {
  // Initial state for stats
  const [stats, setStats] = useState({
    taille: 2,
    phisique: 2,
    beaute: 2,
    intelligence: 2,
  });

  // Handle stat change
  const handleStatChange = (stat, value) => {
    setStats((prevStats) => ({
      ...prevStats,
      [stat]: value,
    }));
  };

  // Render stat bar
  const renderStatBar = (stat) => {
    const value = stats[stat];

    return (
      <div className="stat-bar">
        <span>{stat.charAt(0).toUpperCase() + stat.slice(1)}: </span>
        {[1, 2, 3].map((val) => (
          <div
            key={val}
            className={`bar-segment ${val <= value ? 'active' : ''}`}
            onClick={() => handleStatChange(stat, val)}
            style={{ backgroundColor: getSegmentColor(val, value) }}
          >
            {val === value && <span className="value">{val}</span>}
          </div>
        ))}
      </div>
    );
  };

  // Get color for the segment
  const getSegmentColor = (segmentValue, statValue) => {
    if (segmentValue < statValue) return 'red';
    if (segmentValue === statValue) return 'grey';
    return 'white';
  };

  return (
    <div>
      <h1>Statistical</h1>
      {renderStatBar('taille')}
      {renderStatBar('phisique')}
      {renderStatBar('beaute')}
      {renderStatBar('intelligence')}
    </div>
  );
};

export default Statistical;


