import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as playersService from '../services/players';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import bigGameImage from '../assets/Big-Game.webp';
import bossFightImage from '../assets/Boss-Fight.webp';
import bountyImage from '../assets/Bounty.webp';
import brawlBallImage from '../assets/Brawl-Ball.webp';
import duoShowdownImage from '../assets/Duo-Showdown.webp';
import gemGrabImage from '../assets/Gem-Grab.webp';
import heistImage from '../assets/Heist.webp';
import hotZoneImage from '../assets/Hot-Zone.webp';
import roboRumbleImage from '../assets/Robo-Rumble.webp';
import showdownImage from '../assets/Showdown.webp';
import siegeImage from '../assets/Siege.webp';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 500
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const BattleLog = ({ playerTag }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [battleLog, setBattleLog] = useState([]);
  const classes = useStyles();
  const gameMode = {
    soloShowdown: {
      title: 'SOLO SHOWDOWN',
      image: showdownImage
    },
    duoShowdown: {
      title: 'DUO SHOWDOWN',
      image: duoShowdownImage
    },
    hotZone: {
      title: 'HOT ZONE',
      image: hotZoneImage
    },
    gemGrab: {
      title: 'GEM GRAB',
      image: gemGrabImage
    },
    brawlBall: {
      title: 'BRAWL BALL',
      image: brawlBallImage
    },
    heist: {
      title: 'HEIST',
      image: heistImage
    },
    bounty: {
      title: 'BOUNTY',
      image: bountyImage
    },
    bossFight: {
      title: 'BOSS FIGHT',
      image: bossFightImage
    },
    siege: {
      title: 'SIEGE',
      image: siegeImage
    },
    bigGame: {
      title: 'BIG GAME',
      image: bigGameImage
    },
    roboRumble: {
      title: 'ROBO RUMBLE',
      image: roboRumbleImage
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (playerTag) {
        setIsLoading(true);
        setError(undefined);

        const battleLogResponse = await playersService
          .getBattleLog(playerTag)
          .catch(error => {
            const errorMessage = error?.response?.data?.reason;
            setError(errorMessage);
            setIsLoading(false);
          });

        if (battleLogResponse) setBattleLog(battleLogResponse.data);
        setIsLoading(false);
      }
    }
    fetchData();
  }, [playerTag]);

  const getReadableTime = totalSeconds => {
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = (totalSeconds % 3600) % 60;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )} minutes`;
  };

  return (
    <>
      <div>Battle Log</div>

      {error && <h3>{error}</h3>}

      {isLoading && <h3>Is Loading...</h3>}

      {battleLog &&
        battleLog.items &&
        battleLog.items.length > 0 &&
        battleLog.items.map(item => (
          <Card className={classes.root} variant='outlined'>
            <CardContent
              style={{
                backgroundImage: `url(${gameMode[item.battle.mode].image})`
              }}
            >
              <Typography variant='h5' component='h2'>
                {gameMode[item.battle.mode].title}
              </Typography>
              <Typography
                className={classes.title}
                color='textSecondary'
                gutterBottom
              >
                {item.event.map}
              </Typography>
              <Typography className={classes.pos} color='textSecondary'>
                {item.battle.trophyChange}
              </Typography>
              <Typography variant='body2' component='p'>
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
          </Card>
        ))}
    </>
  );
};

BattleLog.propTypes = {
  playerTag: PropTypes.string.isRequired
};

export default BattleLog;
