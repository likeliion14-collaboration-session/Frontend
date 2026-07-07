export const dummyUser = {
  userId: 1,
  nickname: "주은",
  profileImageUrl: null,
  inviteCode: "WALK-8F3K",
  recordStartedAt: "2026-07-07",
};

export const dummyConnections = [
  {
    connectionId: 1,
    userId: 1,
    targetId: 2,
    targetNickname: "민지",
    targetProfileImageUrl: null,
    isSharingEnabled: true,
    disabledAt: null,
  },
];

export const dummyTrackPoints = [
  {
    pointId: 1,
    requesterId: 1,
    targetId: 1,
    latitude: 37.5665,
    longitude: 126.978,
    recordedAt: "2026-07-07T10:00:00",
  },
  {
    pointId: 2,
    requesterId: 1,
    targetId: 1,
    latitude: 37.5671,
    longitude: 126.9792,
    recordedAt: "2026-07-07T10:03:00",
  },
  {
    pointId: 3,
    requesterId: 1,
    targetId: 1,
    latitude: 37.568,
    longitude: 126.981,
    recordedAt: "2026-07-07T10:06:00",
  },
];

export const dummyLiveLocation = {
  userId: 1,
  latitude: 37.568,
  longitude: 126.981,
  updatedAt: "2026-07-07T10:06:00",
};

export const dummyPhotos = [
  {
    photoId: 1,
    userId: 1,
    imageUrl: "../assets/images/dummy/photo1.png",
    thumbnailUrl: "../assets/images/dummy/photo1.png",
    latitude: 37.5665,
    longitude: 126.978,
    takenAt: "2026-07-07T10:10:00",
    comment: "산책 시작!",
    pinIcon: "📍",
    deletedAt: null,
  },
  {
    photoId: 2,
    userId: 1,
    imageUrl: "../assets/images/dummy/photo2.jpg",
    thumbnailUrl: "../assets/images/dummy/photo2.jpg",
    latitude: 37.5675,
    longitude: 126.98,
    takenAt: "2026-07-07T10:25:00",
    comment: "카페 발견",
    pinIcon: "☕",
    deletedAt: null,
  },
  {
    photoId: 3,
    userId: 1,
    imageUrl: "../assets/images/dummy/photo3.jpeg",
    thumbnailUrl: "../assets/images/dummy/photo3.jpeg",
    latitude: 37.5688,
    longitude: 126.982,
    takenAt: "2026-07-07T10:40:00",
    comment: "오늘의 대표 사진",
    pinIcon: "💚",
    deletedAt: null,
  },
];

export const dummyInvites = [
  {
    inviteId: 1,
    inviteCode: "WALK-8F3K",
    ownerId: 1,
    ownerNickname: "주은",
    createdAt: "2026-07-07T09:00:00",
    expiredAt: "2026-07-08T09:00:00",
  },
];

export const dummyCards = [
  {
    cardId: 1,
    userId: 1,
    title: "오늘의 산책 카드",
    createdAt: "2026-07-07T11:00:00",
    cardPhotos: [dummyPhotos[0], dummyPhotos[1], dummyPhotos[2]],
    totalDistance: 1.8,
    totalSteps: 3200,
  },
];

export const dummyCardCandidates = [
  {
    photoId: 1,
    imageUrl: "../assets/images/dummy/photo1.png",
    takenAt: "2026-07-07T10:10:00",
    latitude: 37.5665,
    longitude: 126.978,
  },
  {
    photoId: 2,
    imageUrl: "../assets/images/dummy/photo2.jpg",
    takenAt: "2026-07-07T10:25:00",
    latitude: 37.5675,
    longitude: 126.98,
  },
  {
    photoId: 3,
    imageUrl: "../assets/images/dummy/photo3.jpeg",
    takenAt: "2026-07-07T10:40:00",
    latitude: 37.5688,
    longitude: 126.982,
  },
];
