import { useQuery } from 'react-query';
import { ServerInfoResponse } from './types';

export function calculateIncrease(startingValue: number, finalValue: number) {
  if (startingValue === 0) return finalValue;
  const value = ((finalValue - startingValue) / startingValue) * 100;
  return Math.round(value * 10) / 10;
}

export function useFetchServerInfo(id: string, enabled: boolean) {
  const { isLoading, error, data, refetch } = useQuery<ServerInfoResponse, Error>(
    ['server-info', id],
    () => fetch('https://cs-boost.lt/api/server_info.php?id=' + id).then((res) => res.json()),
    { enabled }
  );
  const { server, players } = withServerInfoDefaults(data);
  return { isLoading, error, server, players, refetch };
}

function withServerInfoDefaults(response) {
  const defaults = {
    server: {},
    players: []
  };

  return response || defaults;
}
