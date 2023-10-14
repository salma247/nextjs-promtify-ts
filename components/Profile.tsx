import PromptCardList from "./PromptCardList";

type Props = {
  name: string;
  desc: string;
  data: any;
  handleEdit?: (post: any) => void;
  handleDelete?: (post: any) => void;
};

export default function Profile({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: Props) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>

      <p className="desc text-left">{desc}</p>

      <PromptCardList data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
    </section>
  );
}
