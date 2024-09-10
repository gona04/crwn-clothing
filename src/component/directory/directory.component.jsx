import CategoryItem from '../category-item/category-item.component';
import './directory.styles.scss';

const Directory = ({category}) => {
    return (
        <div className="categories-container">
        {category.map(({title, imageUrl}, index) => {
          return (
            <CategoryItem key={index} title={title} imageUrl={imageUrl} />
        )})}
        </div>
    )
}

export default Directory;