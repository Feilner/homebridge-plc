
import { Logging } from 'homebridge';
import snap7 from 'node-snap7';
import { isIPv4 } from 'net';
import dns from 'dns';

export class PLC {
  private s7: snap7.S7Client;
  private connType: snap7.ConnectionType;
  private slot: number;
  private rack: number;
  private ip: string;
  private isConnectOngoing: boolean;
  private log: Logging;

  constructor(log: Logging, ip: string, rack: number, slot: number, isOP: boolean) { 
    this.s7 = new snap7.S7Client();
    this.log = log;
    this.ip = ip;
    this.rack = rack;
    this.slot = slot;
    this.connType = isOP ? 0x1 : 0x2;
    this.isConnectOngoing = false;    
  }

  //PLC connection check function
  connect() {
    const typeName = ['invalid', 'PG-Communication', 'OP-Communication'];

    let rv = false;


    if (this.s7.Connected()) {
      rv = true;
    } else {
      this.log.info('Connecting to %s (%s:%s) %s', this.ip, this.rack, this.slot, typeName[this.connType]);

      if (!this.isConnectOngoing) {
        this.isConnectOngoing = true;
        this.s7.SetConnectionType(this.connType);
        const ok: boolean = this.s7.ConnectTo(this.ip, this.rack, this.slot);
        this.isConnectOngoing = false;
        if(ok) {
          this.log.info('Connected to %s (%s:%s) %s', this.ip, this.rack, this.slot, typeName[this.connType]);
          rv = true;
        } else {
          this.log.error('Connection to %s (%s:%s) %s failed', this.ip, this.rack, this.slot, typeName[this.connType]);
        }        
      }
    }
    return rv;
  }
}


