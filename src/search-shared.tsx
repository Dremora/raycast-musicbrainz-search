import { Action, ActionPanel, List } from '@raycast/api';
import { usePromise } from '@raycast/utils';
import { useState } from 'react';

export default function SearchShared({
  search,
  buildUrl,
  placeholder,
}: {
  search: (
    searchText: string,
    page: number,
  ) => Promise<{
    data: {
      page: number;
      id: string;
      title: string;
      subtitle: string;
    }[];
    hasMore: boolean;
  }>;
  buildUrl: (id: string) => string;
  placeholder: string;
}) {
  const [searchText, setSearchText] = useState('');

  const { isLoading, data, pagination } = usePromise(
    (searchText: string) =>
      async ({ page }) => {
        if (!searchText) {
          return { data: [], hasMore: false };
        }

        return await search(searchText, page);
      },
    [searchText],
  );

  return (
    <List
      isLoading={isLoading}
      filtering={false}
      searchBarPlaceholder={placeholder}
      onSearchTextChange={setSearchText}
      pagination={pagination}
      throttle
    >
      {data?.map((item) => (
        <List.Item
          key={`${item.page}-${item.id}`}
          title={item.title}
          subtitle={item.subtitle}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser url={buildUrl(item.id)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
