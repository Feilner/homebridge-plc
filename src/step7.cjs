import { Logging } from 'homebridge';
import snap7 from 'node-snap7';
import { isIPv4 } from 'net';
import dns from 'dns';


export class PLC {
  private client: any;
  private type: number;
  private slot: number;
  private rack: number;
  private ip: string;
  private isConnectOngoing: boolean;
  private log: Logging;

  constructor(log: Logging, ip: string, rack: number, slot: number, isOP: boolean) { 
    this.client = new snap7.S7Client(); 
    this.log = log;
    this.ip = ip;
    this.rack = rack;
    this.slot = slot;
    this.type = isOP ? snap7.CONNTYPE_OP : snap7.CONNTYPE_PG;
    this.isConnectOngoing = false;

  }

  //PLC connection check function
  connect() {
    const typeName = ['invalid', 'PG-Communication', 'OP-Communication'];

    let rv = false;


    if (this.client.Connected()) {
      rv = true;
    } else {
      this.log.info('Connecting to %s (%s:%s) %s', this.ip, this.rack, this.slot, typeName[this.type]);

      if (!this.isConnectOngoing) {
        this.isConnectOngoing = true;
        let ok = this.client.SetConnectionType(this.type);
        if(ok) {

          ok = this.client.ConnectTo(this.ip, this.rack, this.slot);
          this.isConnectOngoing = false;
          if(ok) {
            this.log.info('Connected to %s (%s:%s) %s', this.ip, this.rack, this.slot, typeName[this.type]);
            rv = true;
          } else {
            this.log.error('Connection to %s (%s:%s) %s failed', this.ip, this.rack, this.slot, typeName[this.type]);
          }
        } else {
          this.isConnectOngoing = false;
          this.log.error('Set connection type to %s (%s:%s) %s failed', typeName[this.type], this.ip, this.rack, this.slot);
        }
      }
    }
    return rv;
  }
}



