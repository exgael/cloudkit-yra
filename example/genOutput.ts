import {
    CKDBQuerySort,
    CKDBQuerySortOrder,
    toInt64,
    CKDBQueryFilter,
    CKDBQueryFilterType,
    CKDBRecordFieldAssetListValue,
    CKDBRecordFieldAssetValue,
    CKDBRecordFieldBytesListValue,
    CKDBRecordFieldBytesValue,
    CKDBRecordFieldDoubleListValue,
    CKDBRecordFieldDoubleValue,
    CKDBRecordFieldInt64ListValue,
    CKDBRecordFieldInt64Value,
    CKDBRecordFieldLocationListValue,
    CKDBRecordFieldLocationValue,
    CKDBRecordFieldReferenceListValue,
    CKDBRecordFieldReferenceValue,
    CKDBRecordFieldStringListValue,
    CKDBRecordFieldStringValue,
    CKDBRecordFieldTimestampListValue,
    CKDBRecordFieldTimestampValue,
    createCKDBRecordFieldAssetListValue,
    createCKDBRecordFieldAssetValue,
    createCKDBRecordFieldBytesListValue,
    createCKDBRecordFieldBytesValue,
    createCKDBRecordFieldDoubleListValue,
    createCKDBRecordFieldDoubleValue,
    createCKDBRecordFieldInt64ListValue,
    createCKDBRecordFieldInt64Value,
    createCKDBRecordFieldLocationListValue,
    createCKDBRecordFieldLocationValue,
    createCKDBRecordFieldReferenceListValue,
    createCKDBRecordFieldReferenceValue,
    createCKDBRecordFieldStringListValue,
    createCKDBRecordFieldStringValue,
    createCKDBRecordFieldTimestampListValue,
    createCKDBRecordFieldTimestampValue
} from "@apple/cktool.database";

import {
    CKModel
} from "../src/YraFramework/apple/CKModel/CKModel";
import {
    ConvertibleToCKDBAsset
} from "@apple/cktool.database/dist/types/field-values/functions/utils";
import {QueryFilter} from "../src/YraFramework/apple/YraAPI/IRecordManager";


export type CKDBAchievement = {
    achievementId: CKDBRecordFieldStringValue;
    displayName: CKDBRecordFieldStringValue;
    earnedDescription: CKDBRecordFieldStringValue;
    imageAsset: CKDBRecordFieldAssetValue;
    points: CKDBRecordFieldInt64Value;
    preEarnedDescription: CKDBRecordFieldStringValue;
};

export type Achievement = {
    achievementId: string;
    displayName: string;
    earnedDescription: string;
    imageAsset: ConvertibleToCKDBAsset;
    points: number;
    preEarnedDescription: string;
};

export type YraAchievement = {
    achievementId: CKDBRecordFieldStringValue & { queryable: true, sortable: false };
    displayName: CKDBRecordFieldStringValue & { queryable: true, sortable: false };
    earnedDescription: CKDBRecordFieldStringValue & { queryable: false, sortable: false };
    imageAsset: CKDBRecordFieldAssetValue & { queryable: false, sortable: false };
    points: CKDBRecordFieldInt64Value & { queryable: false, sortable: false };
    preEarnedDescription: CKDBRecordFieldStringValue & { queryable: false, sortable: false };
};

export type CKDBFriendship = {
    friend1: CKDBRecordFieldReferenceValue;
    friend2: CKDBRecordFieldReferenceValue;
    status: CKDBRecordFieldStringValue;
};

export type Friendship = {
    friend1: string;
    friend2: string;
    status: string;
};

export type YraFriendship = {
    friend1: CKDBRecordFieldReferenceValue & { queryable: true, sortable: false };
    friend2: CKDBRecordFieldReferenceValue & { queryable: true, sortable: false };
    status: CKDBRecordFieldStringValue & { queryable: true, sortable: false };
};

export type CKDBOneVOneMatch = {
    player1: CKDBRecordFieldReferenceValue;
    player1Score: CKDBRecordFieldInt64Value;
    player2: CKDBRecordFieldReferenceValue;
    player2Score: CKDBRecordFieldInt64Value;
};

export type OneVOneMatch = {
    player1: string;
    player1Score: number;
    player2: string;
    player2Score: number;
};

export type YraOneVOneMatch = {
    player1: CKDBRecordFieldReferenceValue & { queryable: true, sortable: false };
    player1Score: CKDBRecordFieldInt64Value & { queryable: false, sortable: false };
    player2: CKDBRecordFieldReferenceValue & { queryable: true, sortable: false };
    player2Score: CKDBRecordFieldInt64Value & { queryable: false, sortable: false };
};

export type CKDBPlayerSeason = {
    eloRating: CKDBRecordFieldInt64Value;
    placementMatchesPlayed: CKDBRecordFieldInt64Value;
    rank: CKDBRecordFieldStringValue;
    season: CKDBRecordFieldReferenceValue;
    user: CKDBRecordFieldReferenceValue;
};

export type PlayerSeason = {
    eloRating: number;
    placementMatchesPlayed: number;
    rank: string;
    season: string;
    user: string;
};

export type YraPlayerSeason = {
    eloRating: CKDBRecordFieldInt64Value & { queryable: true, sortable: true };
    placementMatchesPlayed: CKDBRecordFieldInt64Value & { queryable: false, sortable: false };
    rank: CKDBRecordFieldStringValue & { queryable: false, sortable: false };
    season: CKDBRecordFieldReferenceValue & { queryable: true, sortable: false };
    user: CKDBRecordFieldReferenceValue & { queryable: true, sortable: false };
};

export type CKDBSeason = {
    endDate: CKDBRecordFieldTimestampValue;
    name: CKDBRecordFieldStringValue;
    startDate: CKDBRecordFieldTimestampValue;
    state: CKDBRecordFieldStringValue;
};

export type Season = {
    endDate: Date;
    name: string;
    startDate: Date;
    state: string;
};

export type YraSeason = {
    endDate: CKDBRecordFieldTimestampValue & { queryable: false, sortable: false };
    name: CKDBRecordFieldStringValue & { queryable: false, sortable: false };
    startDate: CKDBRecordFieldTimestampValue & { queryable: false, sortable: false };
    state: CKDBRecordFieldStringValue & { queryable: false, sortable: false };
};

export type CKDBTestRecordFields = {
    myAsset: CKDBRecordFieldAssetValue;
    myAssetL: CKDBRecordFieldAssetListValue;
    myBytes: CKDBRecordFieldBytesValue;
    myBytesL: CKDBRecordFieldBytesListValue;
    myDateTime: CKDBRecordFieldTimestampValue;
    myDateTimeL: CKDBRecordFieldTimestampListValue;
    myDouble: CKDBRecordFieldDoubleValue;
    myDoubleL: CKDBRecordFieldDoubleListValue;
    myInt64: CKDBRecordFieldInt64Value;
    myInt64L: CKDBRecordFieldInt64ListValue;
    myLoc: CKDBRecordFieldLocationValue;
    myLocL: CKDBRecordFieldLocationListValue;
    myRef: CKDBRecordFieldReferenceValue;
    myRefL: CKDBRecordFieldReferenceListValue;
    myString: CKDBRecordFieldStringValue;
    myStringL: CKDBRecordFieldStringListValue;
};

export type TestRecordFields = {
    myAsset: ConvertibleToCKDBAsset;
    myAssetL: ConvertibleToCKDBAsset[];
    myBytes: string;
    myBytesL: string[];
    myDateTime: Date;
    myDateTimeL: Date[];
    myDouble: number;
    myDoubleL: number[];
    myInt64: number;
    myInt64L: number[];
    myLoc: string;
    myLocL: string[];
    myRef: string;
    myRefL: string[];
    myString: string;
    myStringL: string[];
};

export type YraTestRecordFields = {
    myAsset: CKDBRecordFieldAssetValue & { queryable: false, sortable: false };
    myAssetL: CKDBRecordFieldAssetListValue & { queryable: false, sortable: false };
    myBytes: CKDBRecordFieldBytesValue & { queryable: false, sortable: false };
    myBytesL: CKDBRecordFieldBytesListValue & { queryable: false, sortable: false };
    myDateTime: CKDBRecordFieldTimestampValue & { queryable: false, sortable: false };
    myDateTimeL: CKDBRecordFieldTimestampListValue & { queryable: false, sortable: false };
    myDouble: CKDBRecordFieldDoubleValue & { queryable: false, sortable: false };
    myDoubleL: CKDBRecordFieldDoubleListValue & { queryable: false, sortable: false };
    myInt64: CKDBRecordFieldInt64Value & { queryable: false, sortable: false };
    myInt64L: CKDBRecordFieldInt64ListValue & { queryable: false, sortable: false };
    myLoc: CKDBRecordFieldLocationValue & { queryable: false, sortable: false };
    myLocL: CKDBRecordFieldLocationListValue & { queryable: false, sortable: false };
    myRef: CKDBRecordFieldReferenceValue & { queryable: false, sortable: false };
    myRefL: CKDBRecordFieldReferenceListValue & { queryable: false, sortable: false };
    myString: CKDBRecordFieldStringValue & { queryable: false, sortable: false };
    myStringL: CKDBRecordFieldStringListValue & { queryable: false, sortable: false };
};

export type CKDBTwoVTwoMatch = {
    team1Player1: CKDBRecordFieldReferenceValue;
    team1Player1Score: CKDBRecordFieldInt64Value;
    team1Player2: CKDBRecordFieldReferenceValue;
    team1Player2Score: CKDBRecordFieldInt64Value;
    team2Player1: CKDBRecordFieldReferenceValue;
    team2Player1Score: CKDBRecordFieldInt64Value;
    team2Player2: CKDBRecordFieldReferenceValue;
    team2Player2Score: CKDBRecordFieldInt64Value;
};

export type TwoVTwoMatch = {
    team1Player1: string;
    team1Player1Score: number;
    team1Player2: string;
    team1Player2Score: number;
    team2Player1: string;
    team2Player1Score: number;
    team2Player2: string;
    team2Player2Score: number;
};

export type YraTwoVTwoMatch = {
    team1Player1: CKDBRecordFieldReferenceValue & { queryable: true, sortable: false };
    team1Player1Score: CKDBRecordFieldInt64Value & { queryable: false, sortable: false };
    team1Player2: CKDBRecordFieldReferenceValue & { queryable: true, sortable: false };
    team1Player2Score: CKDBRecordFieldInt64Value & { queryable: false, sortable: false };
    team2Player1: CKDBRecordFieldReferenceValue & { queryable: true, sortable: false };
    team2Player1Score: CKDBRecordFieldInt64Value & { queryable: false, sortable: false };
    team2Player2: CKDBRecordFieldReferenceValue & { queryable: true, sortable: false };
    team2Player2Score: CKDBRecordFieldInt64Value & { queryable: false, sortable: false };
};

export type CKDBUser = {
    accent: CKDBRecordFieldStringValue;
    achievementsPoints: CKDBRecordFieldInt64Value;
    allTimeStars: CKDBRecordFieldInt64Value;
    avatar: CKDBRecordFieldStringValue;
    avatarFrame: CKDBRecordFieldStringValue;
    country: CKDBRecordFieldStringValue;
    currentStars: CKDBRecordFieldInt64Value;
    defaultAvatar: CKDBRecordFieldStringValue;
    defaultColor: CKDBRecordFieldStringValue;
    displayName: CKDBRecordFieldStringValue;
    experience: CKDBRecordFieldInt64Value;
    isSubscribed: CKDBRecordFieldInt64Value;
    primaryColor: CKDBRecordFieldStringValue;
    profileEffect: CKDBRecordFieldStringValue;
    soloMatch: CKDBRecordFieldInt64Value;
    soloWin: CKDBRecordFieldInt64Value;
    subscriptionEndDate: CKDBRecordFieldTimestampValue;
    teamMatch: CKDBRecordFieldInt64Value;
    teamWin: CKDBRecordFieldInt64Value;
    title: CKDBRecordFieldStringValue;
    userID: CKDBRecordFieldStringValue;
};

export type User = {
    accent: string;
    achievementsPoints: number;
    allTimeStars: number;
    avatar: string;
    avatarFrame: string;
    country: string;
    currentStars: number;
    defaultAvatar: string;
    defaultColor: string;
    displayName: string;
    experience: number;
    isSubscribed: number;
    primaryColor: string;
    profileEffect: string;
    soloMatch: number;
    soloWin: number;
    subscriptionEndDate: Date;
    teamMatch: number;
    teamWin: number;
    title: string;
    userID: string;
};

export type YraUser = {
    accent: CKDBRecordFieldStringValue & { queryable: false, sortable: false };
    achievementsPoints: CKDBRecordFieldInt64Value & { queryable: false, sortable: false };
    allTimeStars: CKDBRecordFieldInt64Value & { queryable: true, sortable: true };
    avatar: CKDBRecordFieldStringValue & { queryable: false, sortable: false };
    avatarFrame: CKDBRecordFieldStringValue & { queryable: false, sortable: false };
    country: CKDBRecordFieldStringValue & { queryable: false, sortable: false };
    currentStars: CKDBRecordFieldInt64Value & { queryable: false, sortable: true };
    defaultAvatar: CKDBRecordFieldStringValue & { queryable: false, sortable: false };
    defaultColor: CKDBRecordFieldStringValue & { queryable: false, sortable: false };
    displayName: CKDBRecordFieldStringValue & { queryable: true, sortable: false };
    experience: CKDBRecordFieldInt64Value & { queryable: false, sortable: true };
    isSubscribed: CKDBRecordFieldInt64Value & { queryable: false, sortable: false };
    primaryColor: CKDBRecordFieldStringValue & { queryable: false, sortable: false };
    profileEffect: CKDBRecordFieldStringValue & { queryable: false, sortable: false };
    soloMatch: CKDBRecordFieldInt64Value & { queryable: false, sortable: false };
    soloWin: CKDBRecordFieldInt64Value & { queryable: false, sortable: false };
    subscriptionEndDate: CKDBRecordFieldTimestampValue & { queryable: false, sortable: false };
    teamMatch: CKDBRecordFieldInt64Value & { queryable: false, sortable: false };
    teamWin: CKDBRecordFieldInt64Value & { queryable: false, sortable: false };
    title: CKDBRecordFieldStringValue & { queryable: false, sortable: false };
    userID: CKDBRecordFieldStringValue & { queryable: true, sortable: false };
};

export type CKDBUserAchievement = {
    achievement: CKDBRecordFieldReferenceValue;
    completed: CKDBRecordFieldInt64Value;
    completedDate: CKDBRecordFieldTimestampValue;
    progress: CKDBRecordFieldInt64Value;
    user: CKDBRecordFieldReferenceValue;
};

export type UserAchievement = {
    achievement: string;
    completed: number;
    completedDate: Date;
    progress: number;
    user: string;
};

export type YraUserAchievement = {
    achievement: CKDBRecordFieldReferenceValue & { queryable: true, sortable: false };
    completed: CKDBRecordFieldInt64Value & { queryable: false, sortable: false };
    completedDate: CKDBRecordFieldTimestampValue & { queryable: false, sortable: false };
    progress: CKDBRecordFieldInt64Value & { queryable: false, sortable: false };
    user: CKDBRecordFieldReferenceValue & { queryable: true, sortable: false };
};

class AchievementQueryBuilder {
    private filters: QueryFilter[] = [];
    private sorts: CKDBQuerySort[] = [];
    #recordType: string;
    #queryFunc: (recordType: string, filters: QueryFilter[], sorts: CKDBQuerySort[], limit?: number) => Promise<AchievementModel[]>;
    #limit: number = 200;

    constructor(recordType: string, queryFunc: any) {
        this.#recordType = recordType;
        this.#queryFunc = queryFunc;
    }

    async execute() {
        return await this.#queryFunc(this.#recordType, this.filters, this.sorts, this.#limit);
    }

    limit(limit: number) {
        this.#limit = limit;
        return this;
    }
    achievementIdEquals(value: string): this {
        this.filters.push({
            fieldName: 'achievementId',
            fieldValue: { type: "STRING", value: value},
            type: CKDBQueryFilterType.EQUALS
        })
        return this;
    }

    achievementIdNotEquals(value: string): this {
        this.filters.push({
            fieldName: 'achievementId',
            fieldValue: { type: "STRING", value: value},
            type: CKDBQueryFilterType.NOT_EQUALS
        })
        return this;
    }

    achievementIdBeginsWith(values: string[]): this {
        this.filters.push({
            fieldName: 'achievementId',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.BEGINS_WITH
        })
        return this;
    }

    achievementIdNotBeginsWith(values: string[]): this {
        this.filters.push({
            fieldName: 'achievementId',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.NOT_BEGINS_WITH
        })
        return this;
    }

    achievementIdContainsAllTokens(values: string[]): this {
        this.filters.push({
            fieldName: 'achievementId',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.CONTAINS_ALL_TOKENS
        })
        return this;
    }

    achievementIdContainsAnyTokens(values: string[]): this {
        this.filters.push({
            fieldName: 'achievementId',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.CONTAINS_ANY_TOKENS
        })
        return this;
    }

    achievementIdIn(values: string[]): this {
        this.filters.push({
            fieldName: 'achievementId',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.IN
        })
        return this;
    }

    achievementIdNotIn(values: string[]): this {
        this.filters.push({
            fieldName: 'achievementId',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.NOT_IN
        })
        return this;
    }

    displayNameEquals(value: string): this {
        this.filters.push({
            fieldName: 'displayName',
            fieldValue: { type: "STRING", value: value},
            type: CKDBQueryFilterType.EQUALS
        })
        return this;
    }

    displayNameNotEquals(value: string): this {
        this.filters.push({
            fieldName: 'displayName',
            fieldValue: { type: "STRING", value: value},
            type: CKDBQueryFilterType.NOT_EQUALS
        })
        return this;
    }

    displayNameBeginsWith(values: string[]): this {
        this.filters.push({
            fieldName: 'displayName',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.BEGINS_WITH
        })
        return this;
    }

    displayNameNotBeginsWith(values: string[]): this {
        this.filters.push({
            fieldName: 'displayName',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.NOT_BEGINS_WITH
        })
        return this;
    }

    displayNameContainsAllTokens(values: string[]): this {
        this.filters.push({
            fieldName: 'displayName',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.CONTAINS_ALL_TOKENS
        })
        return this;
    }

    displayNameContainsAnyTokens(values: string[]): this {
        this.filters.push({
            fieldName: 'displayName',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.CONTAINS_ANY_TOKENS
        })
        return this;
    }

    displayNameIn(values: string[]): this {
        this.filters.push({
            fieldName: 'displayName',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.IN
        })
        return this;
    }

    displayNameNotIn(values: string[]): this {
        this.filters.push({
            fieldName: 'displayName',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.NOT_IN
        })
        return this;
    }
}

export class AchievementModel extends CKModel<CKDBAchievement> {
    static query() {
        return new AchievementQueryBuilder('Achievement', AchievementModel._query);
    }
    static create(achievement: Achievement) {
        return AchievementModel._create('Achievement', achievement) 
    }
}


class FriendshipQueryBuilder {
    private filters: QueryFilter[] = [];
    private sorts: CKDBQuerySort[] = [];
    #recordType: string;
    #queryFunc: (recordType: string, filters: QueryFilter[], sorts: CKDBQuerySort[], limit?: number) => Promise<FriendshipModel[]>;
    #limit: number = 200;

    constructor(recordType: string, queryFunc: any) {
        this.#recordType = recordType;
        this.#queryFunc = queryFunc;
    }

    async execute() {
        return await this.#queryFunc(this.#recordType, this.filters, this.sorts, this.#limit);
    }

    limit(limit: number) {
        this.#limit = limit;
        return this;
    }
    friend1Equals(value: string): this {
        this.filters.push({
            fieldName: 'friend1',
            fieldValue: { type: "REFERENCE", value: value},
            type: CKDBQueryFilterType.EQUALS
        })
        return this;
    }

    friend1NotEquals(value: string): this {
        this.filters.push({
            fieldName: 'friend1',
            fieldValue: { type: "REFERENCE", value: value},
            type: CKDBQueryFilterType.NOT_EQUALS
        })
        return this;
    }

    friend1In(values: string[]): this {
        this.filters.push({
            fieldName: 'friend1',
            fieldValue: { type: "REFERENCE", value: values},
            type: CKDBQueryFilterType.IN
        })
        return this;
    }

    friend1NotIn(values: string[]): this {
        this.filters.push({
            fieldName: 'friend1',
            fieldValue: { type: "REFERENCE", value: values},
            type: CKDBQueryFilterType.NOT_IN
        })
        return this;
    }

    friend2Equals(value: string): this {
        this.filters.push({
            fieldName: 'friend2',
            fieldValue: { type: "REFERENCE", value: value},
            type: CKDBQueryFilterType.EQUALS
        })
        return this;
    }

    friend2NotEquals(value: string): this {
        this.filters.push({
            fieldName: 'friend2',
            fieldValue: { type: "REFERENCE", value: value},
            type: CKDBQueryFilterType.NOT_EQUALS
        })
        return this;
    }

    friend2In(values: string[]): this {
        this.filters.push({
            fieldName: 'friend2',
            fieldValue: { type: "REFERENCE", value: values},
            type: CKDBQueryFilterType.IN
        })
        return this;
    }

    friend2NotIn(values: string[]): this {
        this.filters.push({
            fieldName: 'friend2',
            fieldValue: { type: "REFERENCE", value: values},
            type: CKDBQueryFilterType.NOT_IN
        })
        return this;
    }

    statusEquals(value: string): this {
        this.filters.push({
            fieldName: 'status',
            fieldValue: { type: "STRING", value: value},
            type: CKDBQueryFilterType.EQUALS
        })
        return this;
    }

    statusNotEquals(value: string): this {
        this.filters.push({
            fieldName: 'status',
            fieldValue: { type: "STRING", value: value},
            type: CKDBQueryFilterType.NOT_EQUALS
        })
        return this;
    }

    statusBeginsWith(values: string[]): this {
        this.filters.push({
            fieldName: 'status',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.BEGINS_WITH
        })
        return this;
    }

    statusNotBeginsWith(values: string[]): this {
        this.filters.push({
            fieldName: 'status',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.NOT_BEGINS_WITH
        })
        return this;
    }

    statusContainsAllTokens(values: string[]): this {
        this.filters.push({
            fieldName: 'status',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.CONTAINS_ALL_TOKENS
        })
        return this;
    }

    statusContainsAnyTokens(values: string[]): this {
        this.filters.push({
            fieldName: 'status',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.CONTAINS_ANY_TOKENS
        })
        return this;
    }

    statusIn(values: string[]): this {
        this.filters.push({
            fieldName: 'status',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.IN
        })
        return this;
    }

    statusNotIn(values: string[]): this {
        this.filters.push({
            fieldName: 'status',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.NOT_IN
        })
        return this;
    }
}

export class FriendshipModel extends CKModel<CKDBFriendship> {
    static query() {
        return new FriendshipQueryBuilder('Friendship', FriendshipModel._query);
    }
    static create(friendship: Friendship) {
        return FriendshipModel._create('Friendship', friendship) 
    }
}


class OneVOneMatchQueryBuilder {
    private filters: QueryFilter[] = [];
    private sorts: CKDBQuerySort[] = [];
    #recordType: string;
    #queryFunc: (recordType: string, filters: QueryFilter[], sorts: CKDBQuerySort[], limit?: number) => Promise<OneVOneMatchModel[]>;
    #limit: number = 200;

    constructor(recordType: string, queryFunc: any) {
        this.#recordType = recordType;
        this.#queryFunc = queryFunc;
    }

    async execute() {
        return await this.#queryFunc(this.#recordType, this.filters, this.sorts, this.#limit);
    }

    limit(limit: number) {
        this.#limit = limit;
        return this;
    }
    player1Equals(value: string): this {
        this.filters.push({
            fieldName: 'player1',
            fieldValue: { type: "REFERENCE", value: value},
            type: CKDBQueryFilterType.EQUALS
        })
        return this;
    }

    player1NotEquals(value: string): this {
        this.filters.push({
            fieldName: 'player1',
            fieldValue: { type: "REFERENCE", value: value},
            type: CKDBQueryFilterType.NOT_EQUALS
        })
        return this;
    }

    player1In(values: string[]): this {
        this.filters.push({
            fieldName: 'player1',
            fieldValue: { type: "REFERENCE", value: values},
            type: CKDBQueryFilterType.IN
        })
        return this;
    }

    player1NotIn(values: string[]): this {
        this.filters.push({
            fieldName: 'player1',
            fieldValue: { type: "REFERENCE", value: values},
            type: CKDBQueryFilterType.NOT_IN
        })
        return this;
    }

    player2Equals(value: string): this {
        this.filters.push({
            fieldName: 'player2',
            fieldValue: { type: "REFERENCE", value: value},
            type: CKDBQueryFilterType.EQUALS
        })
        return this;
    }

    player2NotEquals(value: string): this {
        this.filters.push({
            fieldName: 'player2',
            fieldValue: { type: "REFERENCE", value: value},
            type: CKDBQueryFilterType.NOT_EQUALS
        })
        return this;
    }

    player2In(values: string[]): this {
        this.filters.push({
            fieldName: 'player2',
            fieldValue: { type: "REFERENCE", value: values},
            type: CKDBQueryFilterType.IN
        })
        return this;
    }

    player2NotIn(values: string[]): this {
        this.filters.push({
            fieldName: 'player2',
            fieldValue: { type: "REFERENCE", value: values},
            type: CKDBQueryFilterType.NOT_IN
        })
        return this;
    }
}

export class OneVOneMatchModel extends CKModel<CKDBOneVOneMatch> {
    static query() {
        return new OneVOneMatchQueryBuilder('OneVOneMatch', OneVOneMatchModel._query);
    }
    static create(oneVOneMatch: OneVOneMatch) {
        return OneVOneMatchModel._create('OneVOneMatch', oneVOneMatch) 
    }
}


class PlayerSeasonQueryBuilder {
    private filters: QueryFilter[] = [];
    private sorts: CKDBQuerySort[] = [];
    #recordType: string;
    #queryFunc: (recordType: string, filters: QueryFilter[], sorts: CKDBQuerySort[], limit?: number) => Promise<PlayerSeasonModel[]>;
    #limit: number = 200;

    constructor(recordType: string, queryFunc: any) {
        this.#recordType = recordType;
        this.#queryFunc = queryFunc;
    }

    async execute() {
        return await this.#queryFunc(this.#recordType, this.filters, this.sorts, this.#limit);
    }

    limit(limit: number) {
        this.#limit = limit;
        return this;
    }
    eloRatingEquals(value: number): this {
        this.filters.push({
            fieldName: 'eloRating',
            fieldValue: { type: "INT64", value: value},
            type: CKDBQueryFilterType.EQUALS
        })
        return this;
    }

    eloRatingNotEquals(value: number): this {
        this.filters.push({
            fieldName: 'eloRating',
            fieldValue: { type: "INT64", value: value},
            type: CKDBQueryFilterType.NOT_EQUALS
        })
        return this;
    }

    eloRatingGreaterThan(value: number): this {
        this.filters.push({
            fieldName: 'eloRating',
            fieldValue: { type: "INT64", value: value},
            type: CKDBQueryFilterType.GREATER_THAN
        })
        return this;
    }

    eloRatingLessThan(value: number): this {
        this.filters.push({
            fieldName: 'eloRating',
            fieldValue: { type: "INT64", value: value},
            type: CKDBQueryFilterType.LESS_THAN
        })
        return this;
    }

    eloRatingGreaterThanOrEquals(value: number): this {
        this.filters.push({
            fieldName: 'eloRating',
            fieldValue: { type: "INT64", value: value},
            type: CKDBQueryFilterType.GREATER_THAN_OR_EQUALS
        })
        return this;
    }

    eloRatingLessThanOrEquals(value: number): this {
        this.filters.push({
            fieldName: 'eloRating',
            fieldValue: { type: "INT64", value: value},
            type: CKDBQueryFilterType.LESS_THAN_OR_EQUALS
        })
        return this;
    }

    eloRatingIn(values: number[]): this {
        this.filters.push({
            fieldName: 'eloRating',
            fieldValue: { type: "INT64", value: values},
            type: CKDBQueryFilterType.IN
        })
        return this;
    }

    eloRatingNotIn(values: number[]): this {
        this.filters.push({
            fieldName: 'eloRating',
            fieldValue: { type: "INT64", value: values},
            type: CKDBQueryFilterType.NOT_IN
        })
        return this;
    }

    seasonEquals(value: string): this {
        this.filters.push({
            fieldName: 'season',
            fieldValue: { type: "REFERENCE", value: value},
            type: CKDBQueryFilterType.EQUALS
        })
        return this;
    }

    seasonNotEquals(value: string): this {
        this.filters.push({
            fieldName: 'season',
            fieldValue: { type: "REFERENCE", value: value},
            type: CKDBQueryFilterType.NOT_EQUALS
        })
        return this;
    }

    seasonIn(values: string[]): this {
        this.filters.push({
            fieldName: 'season',
            fieldValue: { type: "REFERENCE", value: values},
            type: CKDBQueryFilterType.IN
        })
        return this;
    }

    seasonNotIn(values: string[]): this {
        this.filters.push({
            fieldName: 'season',
            fieldValue: { type: "REFERENCE", value: values},
            type: CKDBQueryFilterType.NOT_IN
        })
        return this;
    }

    userEquals(value: string): this {
        this.filters.push({
            fieldName: 'user',
            fieldValue: { type: "REFERENCE", value: value},
            type: CKDBQueryFilterType.EQUALS
        })
        return this;
    }

    userNotEquals(value: string): this {
        this.filters.push({
            fieldName: 'user',
            fieldValue: { type: "REFERENCE", value: value},
            type: CKDBQueryFilterType.NOT_EQUALS
        })
        return this;
    }

    userIn(values: string[]): this {
        this.filters.push({
            fieldName: 'user',
            fieldValue: { type: "REFERENCE", value: values},
            type: CKDBQueryFilterType.IN
        })
        return this;
    }

    userNotIn(values: string[]): this {
        this.filters.push({
            fieldName: 'user',
            fieldValue: { type: "REFERENCE", value: values},
            type: CKDBQueryFilterType.NOT_IN
        })
        return this;
    }

    eloRatingAscending(): this {
        this.sorts.push({
        fieldName: 'eloRating',
        order: CKDBQuerySortOrder.ASC
        })
        return this;
    }

    eloRatingDescending(): this {
        this.sorts.push({
        fieldName: 'eloRating',
        order: CKDBQuerySortOrder.DESC
        })
        return this;
    }
}

export class PlayerSeasonModel extends CKModel<CKDBPlayerSeason> {
    static query() {
        return new PlayerSeasonQueryBuilder('PlayerSeason', PlayerSeasonModel._query);
    }
    static create(playerSeason: PlayerSeason) {
        return PlayerSeasonModel._create('PlayerSeason', playerSeason) 
    }
}


class SeasonQueryBuilder {
    private filters: QueryFilter[] = [];
    private sorts: CKDBQuerySort[] = [];
    #recordType: string;
    #queryFunc: (recordType: string, filters: QueryFilter[], sorts: CKDBQuerySort[], limit?: number) => Promise<SeasonModel[]>;
    #limit: number = 200;

    constructor(recordType: string, queryFunc: any) {
        this.#recordType = recordType;
        this.#queryFunc = queryFunc;
    }

    async execute() {
        return await this.#queryFunc(this.#recordType, this.filters, this.sorts, this.#limit);
    }

    limit(limit: number) {
        this.#limit = limit;
        return this;
    }}

export class SeasonModel extends CKModel<CKDBSeason> {
    static query() {
        return new SeasonQueryBuilder('Season', SeasonModel._query);
    }
    static create(season: Season) {
        return SeasonModel._create('Season', season) 
    }
}


class TestRecordFieldsQueryBuilder {
    private filters: QueryFilter[] = [];
    private sorts: CKDBQuerySort[] = [];
    #recordType: string;
    #queryFunc: (recordType: string, filters: QueryFilter[], sorts: CKDBQuerySort[], limit?: number) => Promise<TestRecordFieldsModel[]>;
    #limit: number = 200;

    constructor(recordType: string, queryFunc: any) {
        this.#recordType = recordType;
        this.#queryFunc = queryFunc;
    }

    async execute() {
        return await this.#queryFunc(this.#recordType, this.filters, this.sorts, this.#limit);
    }

    limit(limit: number) {
        this.#limit = limit;
        return this;
    }}

export class TestRecordFieldsModel extends CKModel<CKDBTestRecordFields> {
    static query() {
        return new TestRecordFieldsQueryBuilder('TestRecordFields', TestRecordFieldsModel._query);
    }
    static create(testRecordFields: TestRecordFields) {
        return TestRecordFieldsModel._create('TestRecordFields', testRecordFields) 
    }
}


class TwoVTwoMatchQueryBuilder {
    private filters: QueryFilter[] = [];
    private sorts: CKDBQuerySort[] = [];
    #recordType: string;
    #queryFunc: (recordType: string, filters: QueryFilter[], sorts: CKDBQuerySort[], limit?: number) => Promise<TwoVTwoMatchModel[]>;
    #limit: number = 200;

    constructor(recordType: string, queryFunc: any) {
        this.#recordType = recordType;
        this.#queryFunc = queryFunc;
    }

    async execute() {
        return await this.#queryFunc(this.#recordType, this.filters, this.sorts, this.#limit);
    }

    limit(limit: number) {
        this.#limit = limit;
        return this;
    }
    team1Player1Equals(value: string): this {
        this.filters.push({
            fieldName: 'team1Player1',
            fieldValue: { type: "REFERENCE", value: value},
            type: CKDBQueryFilterType.EQUALS
        })
        return this;
    }

    team1Player1NotEquals(value: string): this {
        this.filters.push({
            fieldName: 'team1Player1',
            fieldValue: { type: "REFERENCE", value: value},
            type: CKDBQueryFilterType.NOT_EQUALS
        })
        return this;
    }

    team1Player1In(values: string[]): this {
        this.filters.push({
            fieldName: 'team1Player1',
            fieldValue: { type: "REFERENCE", value: values},
            type: CKDBQueryFilterType.IN
        })
        return this;
    }

    team1Player1NotIn(values: string[]): this {
        this.filters.push({
            fieldName: 'team1Player1',
            fieldValue: { type: "REFERENCE", value: values},
            type: CKDBQueryFilterType.NOT_IN
        })
        return this;
    }

    team1Player2Equals(value: string): this {
        this.filters.push({
            fieldName: 'team1Player2',
            fieldValue: { type: "REFERENCE", value: value},
            type: CKDBQueryFilterType.EQUALS
        })
        return this;
    }

    team1Player2NotEquals(value: string): this {
        this.filters.push({
            fieldName: 'team1Player2',
            fieldValue: { type: "REFERENCE", value: value},
            type: CKDBQueryFilterType.NOT_EQUALS
        })
        return this;
    }

    team1Player2In(values: string[]): this {
        this.filters.push({
            fieldName: 'team1Player2',
            fieldValue: { type: "REFERENCE", value: values},
            type: CKDBQueryFilterType.IN
        })
        return this;
    }

    team1Player2NotIn(values: string[]): this {
        this.filters.push({
            fieldName: 'team1Player2',
            fieldValue: { type: "REFERENCE", value: values},
            type: CKDBQueryFilterType.NOT_IN
        })
        return this;
    }

    team2Player1Equals(value: string): this {
        this.filters.push({
            fieldName: 'team2Player1',
            fieldValue: { type: "REFERENCE", value: value},
            type: CKDBQueryFilterType.EQUALS
        })
        return this;
    }

    team2Player1NotEquals(value: string): this {
        this.filters.push({
            fieldName: 'team2Player1',
            fieldValue: { type: "REFERENCE", value: value},
            type: CKDBQueryFilterType.NOT_EQUALS
        })
        return this;
    }

    team2Player1In(values: string[]): this {
        this.filters.push({
            fieldName: 'team2Player1',
            fieldValue: { type: "REFERENCE", value: values},
            type: CKDBQueryFilterType.IN
        })
        return this;
    }

    team2Player1NotIn(values: string[]): this {
        this.filters.push({
            fieldName: 'team2Player1',
            fieldValue: { type: "REFERENCE", value: values},
            type: CKDBQueryFilterType.NOT_IN
        })
        return this;
    }

    team2Player2Equals(value: string): this {
        this.filters.push({
            fieldName: 'team2Player2',
            fieldValue: { type: "REFERENCE", value: value},
            type: CKDBQueryFilterType.EQUALS
        })
        return this;
    }

    team2Player2NotEquals(value: string): this {
        this.filters.push({
            fieldName: 'team2Player2',
            fieldValue: { type: "REFERENCE", value: value},
            type: CKDBQueryFilterType.NOT_EQUALS
        })
        return this;
    }

    team2Player2In(values: string[]): this {
        this.filters.push({
            fieldName: 'team2Player2',
            fieldValue: { type: "REFERENCE", value: values},
            type: CKDBQueryFilterType.IN
        })
        return this;
    }

    team2Player2NotIn(values: string[]): this {
        this.filters.push({
            fieldName: 'team2Player2',
            fieldValue: { type: "REFERENCE", value: values},
            type: CKDBQueryFilterType.NOT_IN
        })
        return this;
    }
}

export class TwoVTwoMatchModel extends CKModel<CKDBTwoVTwoMatch> {
    static query() {
        return new TwoVTwoMatchQueryBuilder('TwoVTwoMatch', TwoVTwoMatchModel._query);
    }
    static create(twoVTwoMatch: TwoVTwoMatch) {
        return TwoVTwoMatchModel._create('TwoVTwoMatch', twoVTwoMatch) 
    }
}


class UserQueryBuilder {
    private filters: QueryFilter[] = [];
    private sorts: CKDBQuerySort[] = [];
    #recordType: string;
    #queryFunc: (recordType: string, filters: QueryFilter[], sorts: CKDBQuerySort[], limit?: number) => Promise<UserModel[]>;
    #limit: number = 200;

    constructor(recordType: string, queryFunc: any) {
        this.#recordType = recordType;
        this.#queryFunc = queryFunc;
    }

    async execute() {
        return await this.#queryFunc(this.#recordType, this.filters, this.sorts, this.#limit);
    }

    limit(limit: number) {
        this.#limit = limit;
        return this;
    }
    allTimeStarsEquals(value: number): this {
        this.filters.push({
            fieldName: 'allTimeStars',
            fieldValue: { type: "INT64", value: value},
            type: CKDBQueryFilterType.EQUALS
        })
        return this;
    }

    allTimeStarsNotEquals(value: number): this {
        this.filters.push({
            fieldName: 'allTimeStars',
            fieldValue: { type: "INT64", value: value},
            type: CKDBQueryFilterType.NOT_EQUALS
        })
        return this;
    }

    allTimeStarsGreaterThan(value: number): this {
        this.filters.push({
            fieldName: 'allTimeStars',
            fieldValue: { type: "INT64", value: value},
            type: CKDBQueryFilterType.GREATER_THAN
        })
        return this;
    }

    allTimeStarsLessThan(value: number): this {
        this.filters.push({
            fieldName: 'allTimeStars',
            fieldValue: { type: "INT64", value: value},
            type: CKDBQueryFilterType.LESS_THAN
        })
        return this;
    }

    allTimeStarsGreaterThanOrEquals(value: number): this {
        this.filters.push({
            fieldName: 'allTimeStars',
            fieldValue: { type: "INT64", value: value},
            type: CKDBQueryFilterType.GREATER_THAN_OR_EQUALS
        })
        return this;
    }

    allTimeStarsLessThanOrEquals(value: number): this {
        this.filters.push({
            fieldName: 'allTimeStars',
            fieldValue: { type: "INT64", value: value},
            type: CKDBQueryFilterType.LESS_THAN_OR_EQUALS
        })
        return this;
    }

    allTimeStarsIn(values: number[]): this {
        this.filters.push({
            fieldName: 'allTimeStars',
            fieldValue: { type: "INT64", value: values},
            type: CKDBQueryFilterType.IN
        })
        return this;
    }

    allTimeStarsNotIn(values: number[]): this {
        this.filters.push({
            fieldName: 'allTimeStars',
            fieldValue: { type: "INT64", value: values},
            type: CKDBQueryFilterType.NOT_IN
        })
        return this;
    }

    displayNameEquals(value: string): this {
        this.filters.push({
            fieldName: 'displayName',
            fieldValue: { type: "STRING", value: value},
            type: CKDBQueryFilterType.EQUALS
        })
        return this;
    }

    displayNameNotEquals(value: string): this {
        this.filters.push({
            fieldName: 'displayName',
            fieldValue: { type: "STRING", value: value},
            type: CKDBQueryFilterType.NOT_EQUALS
        })
        return this;
    }

    displayNameBeginsWith(values: string[]): this {
        this.filters.push({
            fieldName: 'displayName',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.BEGINS_WITH
        })
        return this;
    }

    displayNameNotBeginsWith(values: string[]): this {
        this.filters.push({
            fieldName: 'displayName',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.NOT_BEGINS_WITH
        })
        return this;
    }

    displayNameContainsAllTokens(values: string[]): this {
        this.filters.push({
            fieldName: 'displayName',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.CONTAINS_ALL_TOKENS
        })
        return this;
    }

    displayNameContainsAnyTokens(values: string[]): this {
        this.filters.push({
            fieldName: 'displayName',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.CONTAINS_ANY_TOKENS
        })
        return this;
    }

    displayNameIn(values: string[]): this {
        this.filters.push({
            fieldName: 'displayName',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.IN
        })
        return this;
    }

    displayNameNotIn(values: string[]): this {
        this.filters.push({
            fieldName: 'displayName',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.NOT_IN
        })
        return this;
    }

    userIDEquals(value: string): this {
        this.filters.push({
            fieldName: 'userID',
            fieldValue: { type: "STRING", value: value},
            type: CKDBQueryFilterType.EQUALS
        })
        return this;
    }

    userIDNotEquals(value: string): this {
        this.filters.push({
            fieldName: 'userID',
            fieldValue: { type: "STRING", value: value},
            type: CKDBQueryFilterType.NOT_EQUALS
        })
        return this;
    }

    userIDBeginsWith(values: string[]): this {
        this.filters.push({
            fieldName: 'userID',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.BEGINS_WITH
        })
        return this;
    }

    userIDNotBeginsWith(values: string[]): this {
        this.filters.push({
            fieldName: 'userID',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.NOT_BEGINS_WITH
        })
        return this;
    }

    userIDContainsAllTokens(values: string[]): this {
        this.filters.push({
            fieldName: 'userID',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.CONTAINS_ALL_TOKENS
        })
        return this;
    }

    userIDContainsAnyTokens(values: string[]): this {
        this.filters.push({
            fieldName: 'userID',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.CONTAINS_ANY_TOKENS
        })
        return this;
    }

    userIDIn(values: string[]): this {
        this.filters.push({
            fieldName: 'userID',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.IN
        })
        return this;
    }

    userIDNotIn(values: string[]): this {
        this.filters.push({
            fieldName: 'userID',
            fieldValue: { type: "STRING", value: values},
            type: CKDBQueryFilterType.NOT_IN
        })
        return this;
    }

    allTimeStarsAscending(): this {
        this.sorts.push({
        fieldName: 'allTimeStars',
        order: CKDBQuerySortOrder.ASC
        })
        return this;
    }

    allTimeStarsDescending(): this {
        this.sorts.push({
        fieldName: 'allTimeStars',
        order: CKDBQuerySortOrder.DESC
        })
        return this;
    }

    currentStarsAscending(): this {
        this.sorts.push({
        fieldName: 'currentStars',
        order: CKDBQuerySortOrder.ASC
        })
        return this;
    }

    currentStarsDescending(): this {
        this.sorts.push({
        fieldName: 'currentStars',
        order: CKDBQuerySortOrder.DESC
        })
        return this;
    }

    experienceAscending(): this {
        this.sorts.push({
        fieldName: 'experience',
        order: CKDBQuerySortOrder.ASC
        })
        return this;
    }

    experienceDescending(): this {
        this.sorts.push({
        fieldName: 'experience',
        order: CKDBQuerySortOrder.DESC
        })
        return this;
    }
}

export class UserModel extends CKModel<CKDBUser> {
    static query() {
        return new UserQueryBuilder('User', UserModel._query);
    }
    static create(user: User) {
        return UserModel._create('User', user)
    }
}


class UserAchievementQueryBuilder {
    private filters: QueryFilter[] = [];
    private sorts: CKDBQuerySort[] = [];
    #recordType: string;
    #queryFunc: (recordType: string, filters: QueryFilter[], sorts: CKDBQuerySort[], limit?: number) => Promise<UserAchievementModel[]>;
    #limit: number = 200;

    constructor(recordType: string, queryFunc: any) {
        this.#recordType = recordType;
        this.#queryFunc = queryFunc;
    }

    async execute() {
        return await this.#queryFunc(this.#recordType, this.filters, this.sorts, this.#limit);
    }

    limit(limit: number) {
        this.#limit = limit;
        return this;
    }
    achievementEquals(value: string): this {
        this.filters.push({
            fieldName: 'achievement',
            fieldValue: { type: "REFERENCE", value: value},
            type: CKDBQueryFilterType.EQUALS
        })
        return this;
    }

    achievementNotEquals(value: string): this {
        this.filters.push({
            fieldName: 'achievement',
            fieldValue: { type: "REFERENCE", value: value},
            type: CKDBQueryFilterType.NOT_EQUALS
        })
        return this;
    }

    achievementIn(values: string[]): this {
        this.filters.push({
            fieldName: 'achievement',
            fieldValue: { type: "REFERENCE", value: values},
            type: CKDBQueryFilterType.IN
        })
        return this;
    }

    achievementNotIn(values: string[]): this {
        this.filters.push({
            fieldName: 'achievement',
            fieldValue: { type: "REFERENCE", value: values},
            type: CKDBQueryFilterType.NOT_IN
        })
        return this;
    }

    userEquals(value: string): this {
        this.filters.push({
            fieldName: 'user',
            fieldValue: { type: "REFERENCE", value: value},
            type: CKDBQueryFilterType.EQUALS
        })
        return this;
    }

    userNotEquals(value: string): this {
        this.filters.push({
            fieldName: 'user',
            fieldValue: { type: "REFERENCE", value: value},
            type: CKDBQueryFilterType.NOT_EQUALS
        })
        return this;
    }

    userIn(values: string[]): this {
        this.filters.push({
            fieldName: 'user',
            fieldValue: { type: "REFERENCE", value: values},
            type: CKDBQueryFilterType.IN
        })
        return this;
    }

    userNotIn(values: string[]): this {
        this.filters.push({
            fieldName: 'user',
            fieldValue: { type: "REFERENCE", value: values},
            type: CKDBQueryFilterType.NOT_IN
        })
        return this;
    }
}

export class UserAchievementModel extends CKModel<CKDBUserAchievement> {
    static query() {
        return new UserAchievementQueryBuilder('UserAchievement', UserAchievementModel._query);
    }
    static create(userAchievement: UserAchievement) {
        return UserAchievementModel._create('UserAchievement', userAchievement) 
    }
}


