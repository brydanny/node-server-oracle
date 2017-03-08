/**
 * Created by Danny on 27/2/2017.
 */
export default class Meta{
    constructor (name, objColumns,primaryKey,limit,offset,previous,next,totalCount) {
        this.name = name;
        this.columns = objColumns;
        this.id = primaryKey;
        this.limit =limit;
        this.offset = offset;
        this.previous = previous;
        this.next = next;
        this.totalCount = totalCount;
        this;
    }
    //return Column;
}