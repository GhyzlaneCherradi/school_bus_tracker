import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { API_BASE_URL } from '../../Config/Config';
import {
  updateLocation,
  setLocationHistory,
  setConnectionStatus,
  setConnectionError,
} from '../Redux/Tracking-Slice';

export const useBusLocation = (busId) => {
  const dispatch = useDispatch();
  const socketRef = useRef(null);

  useEffect(() => {
    // update status to connecting immediately
    dispatch(setConnectionStatus('connecting'));

    // Connect to the WebSocket Gateway with the tracking namespace
    const socket = io(`${API_BASE_URL}/tracking`, {
      reconnectionAttempts: 5, // max 
      autoConnect: true,
      transports: ["websocket"], // 
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Socket Connected:', socket.id);
      dispatch(setConnectionStatus('connected'));

      if (busId) {
        socket.emit(
          'getLatestLocations',
          { busId, limit: 25 },
          (history = []) => {
            dispatch(setLocationHistory(history));
          },
        );
      }
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket Disconnected:', reason);
      dispatch(setConnectionError(`Disconnected: ${reason}`));
    });

    socket.on('connect_error', (err) => {
      console.log('Socket Connection Error:', err.message);
      dispatch(setConnectionError(`Conn Error: ${err.message}`));
    });

    socket.on('error', (err) => {
      console.log('Socket Error:', err);
      dispatch(setConnectionError(`Error: ${err}`));
    });

    // Listening for real-time location broadcasts from the backend
    socket.on('locationUpdated', (data) => {
      if (busId && data?.busId && data.busId !== busId) return;
      // Dispatches the new coordinates  to global state 
      dispatch(updateLocation(data));
    });

    // Cleanup function: Disconnect socket when the hook  unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [busId, dispatch]);

  return socketRef;
};
