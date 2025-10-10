import mongoose from "mongoose";
export declare const UserModel: mongoose.Model<{
    name: string;
    email: string;
    password: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    email: string;
    password: string;
}, {}, mongoose.DefaultSchemaOptions> & {
    name: string;
    email: string;
    password: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    email: string;
    password: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    email: string;
    password: string;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    name: string;
    email: string;
    password: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export declare const MessageModel: mongoose.Model<{
    from: mongoose.Types.ObjectId;
    message: string;
    roomId: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    };
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    from: mongoose.Types.ObjectId;
    message: string;
    roomId: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    };
}, {}, mongoose.DefaultSchemaOptions> & {
    from: mongoose.Types.ObjectId;
    message: string;
    roomId: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    };
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    from: mongoose.Types.ObjectId;
    message: string;
    roomId: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    };
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    from: mongoose.Types.ObjectId;
    message: string;
    roomId: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    };
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    from: mongoose.Types.ObjectId;
    message: string;
    roomId: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    };
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export declare const RoomModel: mongoose.Model<{
    users: mongoose.Types.DocumentArray<{
        prototype?: unknown;
        cacheHexString?: unknown;
        generate?: any;
        createFromTime?: any;
        createFromHexString?: any;
        createFromBase64?: any;
        isValid?: any;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        prototype?: unknown;
        cacheHexString?: unknown;
        generate?: any;
        createFromTime?: any;
        createFromHexString?: any;
        createFromBase64?: any;
        isValid?: any;
    }> & {
        prototype?: unknown;
        cacheHexString?: unknown;
        generate?: any;
        createFromTime?: any;
        createFromHexString?: any;
        createFromBase64?: any;
        isValid?: any;
    }>;
    hash?: unknown;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    users: mongoose.Types.DocumentArray<{
        prototype?: unknown;
        cacheHexString?: unknown;
        generate?: any;
        createFromTime?: any;
        createFromHexString?: any;
        createFromBase64?: any;
        isValid?: any;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        prototype?: unknown;
        cacheHexString?: unknown;
        generate?: any;
        createFromTime?: any;
        createFromHexString?: any;
        createFromBase64?: any;
        isValid?: any;
    }> & {
        prototype?: unknown;
        cacheHexString?: unknown;
        generate?: any;
        createFromTime?: any;
        createFromHexString?: any;
        createFromBase64?: any;
        isValid?: any;
    }>;
    hash?: unknown;
}, {}, mongoose.DefaultSchemaOptions> & {
    users: mongoose.Types.DocumentArray<{
        prototype?: unknown;
        cacheHexString?: unknown;
        generate?: any;
        createFromTime?: any;
        createFromHexString?: any;
        createFromBase64?: any;
        isValid?: any;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        prototype?: unknown;
        cacheHexString?: unknown;
        generate?: any;
        createFromTime?: any;
        createFromHexString?: any;
        createFromBase64?: any;
        isValid?: any;
    }> & {
        prototype?: unknown;
        cacheHexString?: unknown;
        generate?: any;
        createFromTime?: any;
        createFromHexString?: any;
        createFromBase64?: any;
        isValid?: any;
    }>;
    hash?: unknown;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    hash: string;
    users: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    }[];
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    hash: string;
    users: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    }[];
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    hash: string;
    users: {
        prototype?: mongoose.Types.ObjectId | null;
        cacheHexString?: unknown;
        generate?: {} | null;
        createFromTime?: {} | null;
        createFromHexString?: {} | null;
        createFromBase64?: {} | null;
        isValid?: {} | null;
    }[];
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=db.d.ts.map