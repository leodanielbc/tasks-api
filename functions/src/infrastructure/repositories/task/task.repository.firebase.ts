import { Task } from "../../../domain/task/entity/task";
import { TaskGateway } from "../../../domain/task/gateway/task.gateway";
import { firestore } from "../../package/firebase";

export class TaskRepositoryFirestore implements TaskGateway {
    private collectionName = "tasks";

    private constructor() { }

    public static create() {
        return new TaskRepositoryFirestore();
    }

    async findById(id: string): Promise<Task | null> {
        const db = firestore();
        const doc = await db.collection(this.collectionName).doc(id).get();
        if (!doc.exists) return null;
        return { id: doc.id, ...(doc.data() as any) } as Task;
    }

    async findAllByUser(userId: string): Promise<Task[]> {
        const db = firestore();
        const snapshot = await db.collection(this.collectionName)
            .where("userId", "==", userId)
            .get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) } as Task));
    }

    async save(task: Task): Promise<Task> {
        const db = firestore();
        const { id, ...dataWithoutId } = task.toJSON();
        const ref = await db.collection(this.collectionName).add(dataWithoutId);
        return { id: ref.id, ...dataWithoutId } as unknown as Task;
    }


    async update(id: string, task: Task): Promise<Task> {
        const db = firestore();
        const { id: _ignoredId, ...dataWithoutId } = task.toJSON(); // ignoramos id dentro de task
        await db.collection(this.collectionName).doc(id).set(dataWithoutId, { merge: true });
        return { id, ...dataWithoutId } as unknown as Task;
    }


    async delete(id: string): Promise<void> {
        const db = firestore();
        await db.collection(this.collectionName).doc(id).delete();
    }
}
