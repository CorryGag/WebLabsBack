
import { Product } from "src/products/entities/product.entity";
import { Entity, Column, CreateDateColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column("text", {nullable: true})
    description?: string;

    @Column()
    image: string;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" }) 
    update_at: Date;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}
