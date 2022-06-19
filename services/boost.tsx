import { EditableServerValues } from '../components/cs-boost/types';

export function deleteServer(serverId: string) {
  return fetch(process.env.apiUrl + '/php/api/servers/control/delete_ms_server.php', {
    method: 'POST',
    body: JSON.stringify({ serverId })
  }).then((res) => res.json());
}
export function addUpdateServer(values: EditableServerValues) {
  return fetch(process.env.apiUrl + '/php/api/servers/control/add_update_ms_server.php', {
    method: 'POST',
    body: JSON.stringify(values)
  }).then((res) => res.json());
}
