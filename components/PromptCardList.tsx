import PromptCard from "./PromptCard";

type Props = {
  data: [
    {
      prompt: string;
      tags: string[];
      creator: {
        username: string;
        email: string;
        image: string;
      };
    }
  ];
  handleTagClick?: (tag: string) => void;
  handleEdit?: (post: any) => void;
  handleDelete?: (post: any) => void;
};

const PromptCardList = ({ data, handleTagClick, handleEdit, handleDelete }: Props) => {
  return (
    <div className="prompt_layout mt-16">
      {data.map((post: any) => (
        <PromptCard
          key={post._id}
          post={post}
          {...{ handleTagClick, handleEdit, handleDelete }}
         
        />
      ))}
    </div>
  );
};

export default PromptCardList;
