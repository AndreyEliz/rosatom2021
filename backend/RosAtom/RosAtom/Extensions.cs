using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RosAtom
{
    public static  class Extensions
    {
        public static IEnumerable<TSource> WhereIf<TSource>(this IEnumerable<TSource> source, bool condition, Func<TSource, bool> predicate)
            where TSource : class
        {
            if (condition)
                return source.Where(predicate);
            else
                return source;
        }
    }
}
