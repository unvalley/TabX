import { TabList } from '~/core/shared/typings'

export const allTabListData: TabList[] = [
  {
    id: 1,
    title: 'title1',
    description: '',
    tabs: [
      {
        id: 1,
        title: 'title1',
        description: 'description1',
        pinned: false,
        favorite: false,
        lastAccessed: 1630686258,
        url: 'https://example.com',
        favIconUrl: '',
        ogImageUrl: '',
        domain: 'example.com',
      },
    ],
    hasPinned: false,
    createdAt: 1630686258,
    updatedAt: 1630686258,
  },
  {
    id: 2,
    title: 'title2',
    description: '',
    tabs: [
      {
        id: 1,
        title: 'title2',
        description: 'description2',
        pinned: false,
        favorite: false,
        lastAccessed: 1630686258,
        url: 'https://github.com',
        favIconUrl: '',
        ogImageUrl: '',
        domain: 'github.com',
      },
    ],
    hasPinned: false,
    createdAt: 1630686258,
    updatedAt: 1630686258,
  },
]
