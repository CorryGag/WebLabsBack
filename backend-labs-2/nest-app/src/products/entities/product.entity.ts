
import { Category } from "src/categories/entities/category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column("text", {nullable: true})
    description: string;

    @Column("float")
    price: number;

    @Column()
    image: string;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" }) 
    update_at: Date;

    @Column({name: 'category_id', nullable: true })
    category_id : number;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'category_id'})
    category: Category;
}
