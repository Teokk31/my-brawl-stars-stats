import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as playersService from '../services/players';
import * as brawlersService from '../services/brawlers';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const Profile = ({ playerTag }) => {
  const classes = useStyles();

  const [profile, SetProfile] = useState(undefined);
  const [brawlers, setBrawlers] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const massageProfileData = profile => {
      profile.bestRoboRumbleTime = getReadableTime(profile.bestRoboRumbleTime);
      profile.bestTimeAsBigBrawler = getReadableTime(
        profile.bestTimeAsBigBrawler
      );
      profile.nameColor = profile.nameColor.replace('0xff', '#');

      return profile;
    };

    async function fetchData() {
      if (playerTag) {
        setIsLoading(true);
        setError(undefined);
        SetProfile(undefined);

        const playerResponse = await playersService
          .getPlayer(playerTag)
          .catch(error => {
            const errorMessage = error?.response?.data?.reason;
            setError(errorMessage);
            setIsLoading(false);
          });

        if (playerResponse) SetProfile(massageProfileData(playerResponse.data));

        const brawlerResponse = await brawlersService
          .getBrawlers()
          .catch(error => {
            const errorMessage = error?.response?.data?.reason;
            setError(errorMessage);
            setIsLoading(false);
          });

        if (brawlerResponse) setBrawlers(brawlerResponse.data);

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
      {error && <h3>{error}</h3>}

      {isLoading && <h3>Is Loading...</h3>}

      {!isLoading &&
        !error &&
        profile &&
        brawlers &&
        brawlers.items.length > 0 && (
          <>
            <h1 style={{ color: `${profile.nameColor}` }}>{profile.name}</h1>
            <h4>{profile.tag}</h4>

            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label='spanning table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='center' colSpan={2}>
                      Stats
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Current Trophies</TableCell>
                    <TableCell>
                      {profile.trophies}/{profile.highestTrophies}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Level</TableCell>
                    <TableCell>{profile.expLevel}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Unlocked Brawlers</TableCell>
                    <TableCell>
                      {profile.brawlers.length}/{brawlers.items.length}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Club</TableCell>
                    <TableCell>{profile.club?.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Solo Victories</TableCell>
                    <TableCell>{profile.soloVictories}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Duo Victories</TableCell>
                    <TableCell>{profile.duoVictories}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3 Vs 3 Victories</TableCell>
                    <TableCell>{profile['3vs3Victories']}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Power Play Points</TableCell>
                    <TableCell>
                      {profile.powerPlayPoints}/{profile.highestPowerPlayPoints}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Best Robo Rumble Time</TableCell>
                    <TableCell>{profile.bestRoboRumbleTime}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Best Time As Big Brawler
                    </TableCell>
                    <TableCell>{profile.bestTimeAsBigBrawler}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Qualifed from Championship Challenge</TableCell>
                    <TableCell>
                      {profile.isQualifiedFromChampionshipChallenge
                        ? 'Yes'
                        : 'No'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
    </>
  );
};

Profile.propTypes = {
  playerTag: PropTypes.string.isRequired
};

export default Profile;
