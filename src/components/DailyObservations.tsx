import React from 'react';
import { DailyObservationViewer } from './DailyObservationViewer';

type Props = {
  clientId: string;
  refreshKey?: number;
  onBack: () => void;
};

export default function DailyObservations(props: Props) {
  return <DailyObservationViewer {...props} />;
}