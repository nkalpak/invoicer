import { everhourApi } from "../../../lib/axios";
import dayjs from "dayjs";
import { InferQueryOptions } from "../../../utils/types";
import { useQuery } from "react-query";

interface IData {
  dateFrom: string;
  dateTo: string;
}

export function formatEverhourDate(date: string) {
  return dayjs(date).format("YYYY-MM-DD");
}

interface IGetHoursWorkedResponse {
  billableAmountExpenses: number;
  billableExpenses: number;
  costsExpenses: number;
  expenses: number;
  memberAvatarUrl: string;
  memberHeadline: string;
  memberId: number;
  memberName: string;
  memberStatus: string;
  paidTimeOffTime: number;
  separateExpenses: number;
  time: number;
  timeOffDays: number;
  timeOffTime: number;
  timerTimePc: number;
}

async function getHoursWorkedApi({ dateFrom, dateTo }: IData) {
  return everhourApi.get<IGetHoursWorkedResponse[]>(
    `/dashboards/users?date_gte=${formatEverhourDate(
      dateFrom
    )}&date_lte=${formatEverhourDate(dateTo)}`
  );
}

const QUERY_KEY_GET_HOURS_WORKED = ({ dateFrom, dateTo }: IData) => [
  "get-hours-worked",
  dateFrom,
  dateTo,
];

function useGetHoursWorked(
  dateFrom: IData["dateFrom"],
  dateTo: IData["dateTo"],
  options?: InferQueryOptions<typeof getHoursWorkedApi>
) {
  const { data, ...rest } = useQuery(
    QUERY_KEY_GET_HOURS_WORKED({ dateFrom, dateTo }),
    () => getHoursWorkedApi({ dateFrom, dateTo }),
    options
  );

  const time = data?.data[0]?.time ?? 0;
  const timeOff = data?.data[0]?.timeOffTime ?? 0;

  return {
    ...rest,
    hoursWorked: (time - timeOff) / 3600,
  };
}

export { useGetHoursWorked };
