
export interface DataSourceLoadOptionsBase {
  stringToLowerDefault?: boolean;
  requireTotalCount: boolean;
  requireGroupCount: boolean;
  isCountQuery: boolean;
  isSummaryQuery: boolean;
  skip: number;
  take: number;
  sort: SortingInfo[];
  group: GroupingInfo[];
  filter: object[];
  totalSummary: SummaryInfo[];
  groupSummary: SummaryInfo[];
  select: string[];
  preSelect: string[];
  remoteSelect?: boolean;
  remoteGrouping?: boolean;
  expandLinqSumType?: boolean;
  primaryKey: string[];
  defaultSort?: string;
  stringToLower?: boolean;
  paginateViaPrimaryKey?: boolean;
  sortByPrimaryKey?: boolean;
  allowAsyncOverSync: boolean;
}

export interface GroupingInfo extends SortingInfo {
  groupInterval?: string;
  isExpanded?: boolean;
}

export interface SortingInfo {
  selector?: string;
  desc: boolean;
}

export interface SummaryInfo {
  selector?: string;
  summaryType?: string;
}
